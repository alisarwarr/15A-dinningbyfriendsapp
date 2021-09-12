const gremlin = require('gremlin');
import Userfriend from './type/Userfriend';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;
const __ = gremlin.process.statics;


async function getUserfriendById(userfriend: Userfriend) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get an outgoing/incoming vertex of specific label & specific id vertex to/from specific label & specific id vertex from database
            g.V()
            .hasLabel('users')
            .has('id', userfriend.idFrom)
            .both()
            .hasLabel('users')
            .has('id', userfriend.idTo)
            .properties().toList()
        );

        let getUser = query.reduce((acc, next) => {
            acc[next.label] = next.value;
            return acc;
        }, {});



        //creating query
        let query2 = await (
            //get an outgoing/incoming vertex of specific label & specific id vertex to/from specific label edge of specific label & specific id vertex from database
            g.V()
            .hasLabel('users')
            .has('id', userfriend.idFrom)
            .bothE()
            .hasLabel('userfriends')
            .where(
                __.otherV()
                .hasLabel('users')
                .has('id', userfriend.idTo)
            )
            .toList()
        );



        //modified data
        let modifiedData = Object();
        modifiedData = {
            ...getUser,
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

export default getUserfriendById;