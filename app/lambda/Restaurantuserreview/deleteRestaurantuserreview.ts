const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


async function deleteRestaurantuserreview(r_id: string) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //delete vertex from database
            g.V()
            .hasLabel('reviews')
            .has('r_id', r_id)
            .drop().iterate()
        );

        /*edge automatically deleted ( for already created vertex with this vertex )*/
        await dc.close();
        return r_id;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteRestaurantuserreview;
