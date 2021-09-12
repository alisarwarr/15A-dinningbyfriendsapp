const gremlin = require('gremlin');
import Userfriend from './type/Userfriend';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


async function createUserfriend(userfriend: Userfriend) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //add edge into database
            g.addE('userfriends')
            .from_(
                __.V()
                .hasLabel('users')
                .has('id', userfriend.idFrom)
            )
            .to(
                __.V()
                .hasLabel('users')
                .has('id', userfriend.idTo)
            )
            .next()
        );

        await dc.close();
        return userfriend;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createUserfriend;