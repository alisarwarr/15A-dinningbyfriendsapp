const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;


async function getUserByName(name: string) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get vertex from database
            g.V()
            .hasLabel('users')
            .has('name', name)
            .properties().toList()
        );

        let getUser = query.reduce((acc, next) => {
          acc[next.label] = next.value;
          return acc;
        }, {});

        await dc.close();
        return getUser;
    }
    catch (err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getUserByName;