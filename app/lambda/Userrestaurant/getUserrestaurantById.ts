const gremlin = require('gremlin');
import Userrestaurant from './type/Userrestaurant';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;
const __ = gremlin.process.statics;


async function getUserrestaurantById(userrestaurant: Userrestaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get an outgoing/incoming vertex of specific label & specific id vertex to/from specific label & specific id vertex from database
            g.V()
            .hasLabel('users')
            .has('id', userrestaurant.idFrom)
            .both()
            .hasLabel('restaurants')
            .has('id', userrestaurant.idTo)
            .properties().toList()
        );
    
        let getUserrestaurant = query.reduce((acc, next) => {
            acc[next.label] = next.value;
            return acc;
        }, {});



        //creating query
        let query2 = await (
            //get an outgoing/incoming vertex of specific label & specific id vertex to/from specific label edge of specific label & specific id vertex from database
            g.V()
            .hasLabel('users')
            .has('id', userrestaurant.idFrom)
            .bothE()
            .hasLabel('userrestaurants')
            .where(
                __.otherV()
                .hasLabel('restaurants')
                .has('id', userrestaurant.idTo)
            )
            .toList()
        );



        //modified data
        let modifiedData = Object();
        modifiedData = {
            ...getUserrestaurant,
            edge_id      : query2[0].id,
            edge_label   : query2[0].label,
            edge_outV_id : query2[0].outV.id,
            edge_inV_id  : query2[0].inV.id
        }



        await dc.close();
        return modifiedData;
    }
    catch (err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getUserrestaurantById;