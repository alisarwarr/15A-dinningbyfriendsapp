const gremlin = require('gremlin');


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


//COGNITO
const AWS = require('aws-sdk');
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();


async function deleteUser(user) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        //deleting user from cognito
        let result = await cognitoidentityserviceprovider.adminDeleteUser({
            UserPoolId: process.env.USERPOOL_ID || '',
            Username: user.name
        }).promise();

        //creating query
        let query = await (
            //delete vertex from database
            g.V()
            .hasLabel('users')
            .has('id', user.id)
            .drop().iterate()
        );

        await dc.close();
        return user.id;
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default deleteUser;