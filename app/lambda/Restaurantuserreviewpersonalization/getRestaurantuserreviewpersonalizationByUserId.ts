const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


async function getRestaurantuserreviewpersonalizationByUserId(restaurantuserreviewpersonalization) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get an outgoing vertex of specific label & specific id vertex to specific label & specific id vertex to specific label & specific id vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuserreviewpersonalization.idFrom)
            .out()
            .hasLabel('reviews')
            .has('r_id', restaurantuserreviewpersonalization.idTo)
            .out()
            .hasLabel('personalizations')
            .has('p_userId_ExistInUsersVertex', restaurantuserreviewpersonalization.hisId)
            .properties().toList()
        );

        let getRestaurantuserreviewpersonalization = query.reduce((acc, next) => {
            acc[next.label] = next.value;
            return acc;
        }, {});



        //creating query
        let query2 = await (
            //get an outgoing vertex of specific label & specific id vertex to specific label edge of specific label & specific id vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuserreviewpersonalization.idFrom)
            .out()
            .hasLabel('reviews')
            .has('r_id', restaurantuserreviewpersonalization.idTo)
            .outE()
            .hasLabel('userreviewpersonalizations')
            .where(
                __.otherV()
                .hasLabel('personalizations')
                .has('p_userId_ExistInUsersVertex', restaurantuserreviewpersonalization.hisId)
            )
            .toList()
        );



        //modified data
        let modifiedData = Object();
        modifiedData = {
            ...getRestaurantuserreviewpersonalization,
            edge_id      : query2[0].id,
            edge_label   : query2[0].label,
            edge_outV_id : query2[0].outV.id,
            edge_inV_id  : query2[0].inV.id
        }
        


        await dc.close();
        return modifiedData;        
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default getRestaurantuserreviewpersonalizationByUserId;