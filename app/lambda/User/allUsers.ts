const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;


async function allUsers() {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        let query = await (
            //get all vertices from database
            g.V()
            .hasLabel('users').toList()
        );

        let allUsers = Array();  
        for(const v of query) {                                        //for each vertex
            const _properties = await g.V(v.id).properties().toList(); //for each vertex's id

            let user = _properties.reduce((acc, next) => {
              acc[next.label] = next.value;
              return acc;
            }, {});
  
            allUsers.push(user);
        }
        
        await dc.close();
        return allUsers;
    }
    catch (err) {
        console.log('ERROR', err);
        return null;
    }
}

export default allUsers;