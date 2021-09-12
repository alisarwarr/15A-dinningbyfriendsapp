const gremlin = require('gremlin');
import User from './type/User';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


const { nanoid } = require('nanoid');


async function createUser(user: User) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //creating query
        let query = await (
            //add vertex into database
            g.addV('users')
            .property('id', nanoid())
            .property('name', user.name)
            .next()
        );
        
        await dc.close();
        return user;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default createUser;