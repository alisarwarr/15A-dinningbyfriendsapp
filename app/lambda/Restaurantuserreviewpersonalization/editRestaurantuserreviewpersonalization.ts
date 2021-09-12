const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


async function editRestaurantuserreviewpersonalization(restaurantuserreviewpersonalization) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //update vertex on database
            g.V()
            .hasLabel('personalizations')
            .has('p_id', restaurantuserreviewpersonalization.p_id)
            .property('p_useful', restaurantuserreviewpersonalization.useful)
            .next()
        );

        await dc.close();
        return restaurantuserreviewpersonalization;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default editRestaurantuserreviewpersonalization;