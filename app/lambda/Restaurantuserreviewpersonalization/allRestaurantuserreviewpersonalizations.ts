const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


async function allRestaurantuserreviewpersonalizations(restaurantuserreviewpersonalization) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuserreviewpersonalization.id)
            .out()
            .hasLabel('reviews')
            .out()
            .hasLabel('personalizations')
            .has('p_userId_ExistInUsersVertex', restaurantuserreviewpersonalization.hisId)
            .toList()
        );

        let allPersonalizations = Array();
        for(const v of query) {                                        //for each vertex
            const _properties = await g.V(v.id).properties().toList(); //for each vertex's id

            let review = _properties.reduce((acc, next) => {
                acc[next.label] = next.value;
                return acc;
            }, {});

            allPersonalizations.push(review);
        }



        //creating query
        let query2 = await (
            //get all outgoing edges from specific label & specific id vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuserreviewpersonalization.id)
            .out()
            .hasLabel('reviews')
            .outE()
            .hasLabel('userreviewpersonalizations')
            .where(
                __.otherV()
                .hasLabel('personalizations')
                .has('p_userId_ExistInUsersVertex', restaurantuserreviewpersonalization.hisId)
            )
            .toList()
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
        modifiedData = allPersonalizations.map((obj, i) => {
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
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default allRestaurantuserreviewpersonalizations;