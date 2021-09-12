const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;


async function getRestaurantByName(name: string) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('name', name)
            .properties().toList()
        );

        let getRestaurant = query.reduce((acc, next) => {
          acc[next.label] = next.value;
          return acc;
        }, {});

        await dc.close();
        return getRestaurant;
    }
    catch (err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getRestaurantByName;