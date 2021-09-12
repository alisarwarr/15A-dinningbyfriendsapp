const gremlin = require('gremlin');
import Restaurantuser from './type/Restaurantuser';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;
const __ = gremlin.process.statics;


async function getRestaurantuserById(restaurantuser: Restaurantuser) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get an outgoing/incoming vertex of specific label & specific id vertex to/from specific label & specific id vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuser.idFrom)
            .both()
            .hasLabel('users')
            .has('id', restaurantuser.idTo)
            .properties().toList()
        );

        let getRestaurantuser = query.reduce((acc, next) => {
            acc[next.label] = next.value;
            return acc;
        }, {});



        //creating query
        let query2 = await (
            //get an outgoing/incoming vertex of specific label & specific id vertex to/from specific label edge of specific label & specific id vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuser.idFrom)
            .bothE()
            .hasLabel('userrestaurants')
            .where(
                __.otherV()
                .hasLabel('users')
                .has('id', restaurantuser.idTo)
            )
            .toList()
        );



        //modified data
        let modifiedData = Object();
        modifiedData = {
            ...getRestaurantuser,
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

export default getRestaurantuserById;