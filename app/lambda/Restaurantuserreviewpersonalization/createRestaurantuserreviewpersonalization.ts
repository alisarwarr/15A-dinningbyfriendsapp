const gremlin = require('gremlin');
import Restaurantuserreviewpersonalization from './type/Restaurantuserreviewpersonalization';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


const { nanoid } = require('nanoid');


async function createRestaurantuserreviewpersonalization(restaurantuserreviewpersonalization: Restaurantuserreviewpersonalization) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);


    const p_id = nanoid();


    try {
//creating vertex
/*******************************************************************************************/
        //creating query
        let query = await (
            //add vertex into database
            g.addV('personalizations')
            .property('p_id', p_id)
            .property('p_restaurantId_ExistInRestaurantsVertex', restaurantuserreviewpersonalization.idFrom)
            .property('p_reviewId_ExistInReviewsVertex', restaurantuserreviewpersonalization.idTo)
            .property('p_userId_ExistInUsersVertex', restaurantuserreviewpersonalization.hisId)
            .property('p_userName_ExistInUsersVertex', restaurantuserreviewpersonalization.hisName)
            .property('p_useful', restaurantuserreviewpersonalization.useful)
            .next()
        );
/*******************************************************************************************/



//creating edge ( for already created vertex with this created vertex )
/*******************************************************************************************/
        //creating query
        let query2 = await (
            //add edge into database
            g.addE('userreviewpersonalizations')
            .from_(
                __.V()
                .hasLabel('reviews')
                .has('r_id', restaurantuserreviewpersonalization.idTo)
            )
            .to(
                __.V()
                .hasLabel('personalizations')
                .has('p_id', p_id)
            )            
            .next()
        );
/*******************************************************************************************/



        await dc.close();
        return restaurantuserreviewpersonalization;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createRestaurantuserreviewpersonalization;