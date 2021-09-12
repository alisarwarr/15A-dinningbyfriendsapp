const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


async function deleteUserrestaurant(id: string) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //delete edge from database
            g.E()
            .hasLabel('userrestaurants')
            .hasId(id)
            .drop().iterate()
        );
        
        await dc.close();
        return id;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteUserrestaurant;