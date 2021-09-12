const gremlin = require('gremlin');
import Restaurantuser from './type/Restaurantuser';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


async function createRestaurantuser(restaurantuser: Restaurantuser) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //add edge into database
            g.addE('userrestaurants')/*label is same*/
            .from_(
                __.V()
                .hasLabel('restaurants')
                .has('id', restaurantuser.idFrom)
            )
            .to(
                __.V()
                .hasLabel('users')
                .has('id', restaurantuser.idTo)
            )
            .next()
        );

        await dc.close();
        return restaurantuser;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createRestaurantuser;