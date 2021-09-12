const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


async function editRestaurantuserreview(restaurantuserreview) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //update vertex on database
            g.V()
            .hasLabel('reviews')
            .has('r_id', restaurantuserreview.r_id)
            .property('r_text', restaurantuserreview.text)
            .next()
        );

        await dc.close();
        return restaurantuserreview;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default editRestaurantuserreview;