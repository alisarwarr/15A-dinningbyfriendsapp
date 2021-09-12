const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


async function getRestaurantuserreviewByUserId(restaurantuserreview) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //get an outgoing vertex of specific label & specific id vertex to specific label & specific id vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuserreview.idFrom)
            .out()
            .hasLabel('reviews')
            .has('r_userId_ExistInUsersVertex', restaurantuserreview.idTo)
            .properties().toList()
        );

        let getRestaurantuserreview = query.reduce((acc, next) => {
            acc[next.label] = next.value;
            return acc;
        }, {});



        //creating query
        let query2 = await (
            //get an outgoing vertex of specific label & specific id vertex to specific label edge of specific label & specific id vertex from database
            g.V()
            .hasLabel('restaurants')
            .has('id', restaurantuserreview.idFrom)
            .outE()
            .hasLabel('userreviews')
            .where(
                __.otherV()
                .hasLabel('reviews')
                .has('r_userId_ExistInUsersVertex', restaurantuserreview.idTo)
            )
            .toList()
        );



        //modified data
        let modifiedData = Object();
        modifiedData = {
            ...getRestaurantuserreview,
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

export default getRestaurantuserreviewByUserId;