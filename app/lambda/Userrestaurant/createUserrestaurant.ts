const gremlin = require('gremlin');
import Userrestaurant from './type/Userrestaurant';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;
const __ = gremlin.process.statics;


async function createUserrestaurant(userrestaurant: Userrestaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //add edge into database
            g.addE('userrestaurants')
            .from_(
                __.V()
                .hasLabel('users')
                .has('id', userrestaurant.idFrom)
            )
            .to(
                __.V()
                .hasLabel('restaurants')
                .has('id', userrestaurant.idTo)
            )
            .next()
        );

        await dc.close();
        return userrestaurant;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createUserrestaurant;