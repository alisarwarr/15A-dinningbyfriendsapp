const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;


async function allRestaurants() {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        let query = await (
            //get all vertices from database
            g.V()
            .hasLabel('restaurants').toList()
        );

        let allRestaurants = Array();  
        for(const v of query) {                                        //for each vertex
            const _properties = await g.V(v.id).properties().toList(); //for each vertex's id

            let restaurant = _properties.reduce((acc, next) => {
              acc[next.label] = next.value;
              return acc;
            }, {});
  
            allRestaurants.push(restaurant);
        }

        await dc.close();
        return allRestaurants;
    }
    catch (err) {
        console.log('ERROR', err);
        return null;
    }
}

export default allRestaurants;