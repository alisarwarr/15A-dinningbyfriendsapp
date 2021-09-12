const gremlin = require('gremlin');
import Restaurant from './type/Restaurant';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


const { nanoid } = require('nanoid');


async function createRestaurant(restaurant: Restaurant) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //add vertex into database
            g.addV('restaurants')
            .property('id', nanoid())
            .property('name', restaurant.name)
            .property('cuisine', restaurant.cuisine)
            .property('address', restaurant.address)
            .next()
        );

        await dc.close();
        return restaurant;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createRestaurant;