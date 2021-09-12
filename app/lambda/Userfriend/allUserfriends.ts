const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.READ_ADDRESS;


async function allUserfriends(id: string) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get all outgoing/incoming vertices to/from specific label & specific id vertex from database
            g.V()
            .hasLabel('users')
            .has('id', id)
            .both()
            .hasLabel('users').toList()
        );

        let allUserfriends = Array();
        for(const v of query) {                                        //for each vertex
            const _properties = await g.V(v.id).properties().toList(); //for each vertex's id

            let userfriend = _properties.reduce((acc, next) => {
                acc[next.label] = next.value;
                return acc;
            }, {});
  
            allUserfriends.push(userfriend);
        }



        //creating query
        let query2 = await (
            //get all outgoing/incoming edges from specific label & specific id vertex from database
            g.V()
            .hasLabel('users')
            .has('id', id)
            .bothE()
            .hasLabel('userfriends').toList()
        );

        let allOutEdgesProperties = Array();
        for(const e of query2) {                                       //for each edge
            let outEdgesProperties = {
                id      : e.id,
                label   : e.label,
                outV_id : e.outV.id,
                inV_id  : e.inV.id
            }

            allOutEdgesProperties.push(outEdgesProperties);
        }
        


        //modified data
        let modifiedData = Array();
        //map over for array of objects
        modifiedData = allUserfriends.map((obj, i) => {
            return {
                ...obj,
                edge_id      : allOutEdgesProperties[i].id,
                edge_label   : allOutEdgesProperties[i].label,
                edge_outV_id : allOutEdgesProperties[i].outV_id,
                edge_inV_id  : allOutEdgesProperties[i].inV_id
            }
        });



        await dc.close();
        return modifiedData;
    }
    catch (err) {
        console.log('ERROR', err);
        return null;
    }
}

export default allUserfriends;