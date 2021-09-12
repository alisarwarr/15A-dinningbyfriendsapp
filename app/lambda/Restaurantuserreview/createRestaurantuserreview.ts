const gremlin = require('gremlin');
import Restaurantuserreview from './type/Restaurantuserreview';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


const { nanoid } = require('nanoid');


async function createRestaurantuserreview(restaurantuserreview: Restaurantuserreview) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);


    const r_id = nanoid();


    try {
//creating vertex
/*******************************************************************************************/
        //creating query
        let query = await (
            //add vertex into database
            g.addV('reviews')
            .property('r_id', r_id)
            .property('r_restaurantId_ExistInRestaurantsVertex', restaurantuserreview.idFrom)
            .property('r_userId_ExistInUsersVertex', restaurantuserreview.idTo)
            .property('r_userName_ExistInUsersVertex', restaurantuserreview.hisName)
            .property('r_text', restaurantuserreview.text)
            .next()
        );
/*******************************************************************************************/



//creating edge ( for already created vertex with this created vertex )
/*******************************************************************************************/
        //creating query
        let query2 = await (
            //add edge into database
            g.addE('userreviews')
            .from_(
                __.V()
                .hasLabel('restaurants')
                .has('id', restaurantuserreview.idFrom)
            )
            .to(
                __.V()
                .hasLabel('reviews')
                .has('r_id', r_id)
            )
            .next()
        );
/*******************************************************************************************/



        await dc.close();
        return restaurantuserreview;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createRestaurantuserreview;
