import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as neptune from '@aws-cdk/aws-neptune';
//EVENTBRIDGE
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
//VTL-REQUEST-RESPONSE
import { EVENT_SOURCE, requestTemplate, responseTemplate } from '../utils/appsync-request-response';
//COGNITO
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam';


export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);




//**************************APPSYNC**************************/
    //APPSYNC's API gives you a graphqlApi with apiKey ( for deploying APPSYNC )
    const api = new appsync.GraphqlApi(this, 'graphlApi', {
      name: 'dinningbyfriends-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      }
    });
    //print graphqlApi Url on console after deploy APPSYNC
    new cdk.CfnOutput(this, 'GraphQlAPIURL', {
      value: api.graphqlUrl
    });
    //print apiKey on console after deploy APPSYNC
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || ''
    });    
//**************************APPSYNC**************************/




    //creating HTTPdatasource ( that will put our event to the eventbus )
    const http_datasource = api.addHttpDataSource('dinningbyfriends-ds',
      //ENDPOINT for eventbridge
      `https://events.${this.region}.amazonaws.com/`,
      {
        name: 'httpDsWithEventBridge',
        description: 'From Appsync to Eventbridge',
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: 'events'
        }
      }
    );
    //giving permissions for HTTPdatasource
    events.EventBus.grantPutEvents(http_datasource);




    //mutations
    const mutations = [
      "createUser",
      "createRestaurant",
      "createUserfriend",
      "createUserrestaurant",
      "createRestaurantuser",
      "createRestaurantuserreview",
      "createRestaurantuserreviewpersonalization",
      "deleteUser",
      "deleteRestaurant",
      "deleteUserfriend",
      "deleteUserrestaurant",
      "deleteRestaurantuser",
      "deleteRestaurantuserreview",
      "deleteRestaurantuserreviewpersonalization",
      "editRestaurantuserreview",
      "editRestaurantuserreviewpersonalization"
    ];
    mutations.forEach((thatMutation: string) => {
      let details = `\\\"id\\\": \\\"$ctx.args.id\\\"`;

      if(thatMutation === "createUser") {
        details = `\\\"name\\\":\\\"$ctx.args.name\\\"`;
      }
      else if(thatMutation === "deleteUser") {
        details = `\\\"id\\\": \\\"$ctx.args.id\\\", \\\"name\\\":\\\"$ctx.args.name\\\"`;
      }
      else if(thatMutation === "createRestaurant") {
        details = `\\\"name\\\":\\\"$ctx.args.name\\\", \\\"cuisine\\\":\\\"$ctx.args.cuisine\\\", \\\"address\\\":\\\"$ctx.args.address\\\"`;
      }
      else if(thatMutation === "createUserfriend") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\"`;
      }
      else if(thatMutation === "createUserrestaurant") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\"`;
      }
      else if(thatMutation === "createRestaurantuser") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\"`;
      }
      else if(thatMutation === "createRestaurantuserreview") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\", \\\"hisName\\\":\\\"$ctx.args.hisName\\\", \\\"text\\\":\\\"$ctx.args.text\\\"`;
      }
      else if(thatMutation === "deleteRestaurantuserreview") {
        details = `\\\"r_id\\\":\\\"$ctx.args.r_id\\\"`;
      }
      else if(thatMutation === "editRestaurantuserreview") {
        details = `\\\"r_id\\\":\\\"$ctx.args.r_id\\\", \\\"text\\\":\\\"$ctx.args.text\\\"`;
      }
      else if(thatMutation === "createRestaurantuserreviewpersonalization") {
        details = `\\\"idFrom\\\":\\\"$ctx.args.idFrom\\\", \\\"idTo\\\":\\\"$ctx.args.idTo\\\", \\\"hisId\\\":\\\"$ctx.args.hisId\\\", \\\"hisName\\\":\\\"$ctx.args.hisName\\\", \\\"useful\\\":\\\"$ctx.args.useful\\\"`;
      }
      else if(thatMutation === "deleteRestaurantuserreviewpersonalization") {
        details = `\\\"p_id\\\":\\\"$ctx.args.p_id\\\"`;
      }
      else if(thatMutation === "editRestaurantuserreviewpersonalization") {
        details = `\\\"p_id\\\":\\\"$ctx.args.p_id\\\", \\\"useful\\\":\\\"$ctx.args.useful\\\"`;
      }

      //describing resolver for datasource ( for send data to NEPTUNE )
      http_datasource.createResolver({
        typeName: "Mutation",
        fieldName: thatMutation,
        requestMappingTemplate: appsync.MappingTemplate.fromString(requestTemplate(details, thatMutation)),
        responseMappingTemplate: appsync.MappingTemplate.fromString(responseTemplate())
      });
    });




    //creating VirtualPrivateCloud
    const vpc = new ec2.Vpc(this, 'dinningbyfriends-vpc');




//**************************NEPTUNE**************************/
    //creating NEPTUNE database cluster
    const cluster = new neptune.DatabaseCluster(this, 'dinningbyfriends-database', {
      vpc: vpc,
      instanceType: neptune.InstanceType.R5_LARGE
    });


    //to control who can access the cluster
    //( any conection in this VPC can access NEPTUNE database cluster, so lambdafunction in VPC can use it )
    cluster.connections.allowDefaultPortFromAnyIpv4('open to the world');
  

    //endpoints for write access NEPTUNE database cluster 
    const writeAddress = cluster.clusterEndpoint.socketAddress;
    //endpoints for read access NEPTUNE database cluster 
    const readAddress = cluster.clusterReadEndpoint.socketAddress;
//**************************NEPTUNE**************************/




    //creating lambdalayer
    const lambdaLayer = new lambda.LayerVersion(this, 'lambdaLayer', {
      code: lambda.Code.fromAsset('lambda-layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X]
    });
    //creating lambdafunction
    const myLambda = new lambda.Function(this, 'dinningbyfriends-myLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: new lambda.AssetCode("lambda"),
      handler: 'index.handler',
      currentVersionOptions: {
        //async retry attempts
        retryAttempts: 0
      },
      //giving timeout
      timeout: cdk.Duration.minutes(2),
      //giving layers
      layers: [lambdaLayer],
      //giving VPC
      vpc: vpc
    });




    //setting lambdafunction ( as a datasource of endpoint )
    const myLambda_datasource = api.addLambdaDataSource('myLamdaDataSource', myLambda);




    //queries
    const queries = [
      "allUsers",
      "allRestaurants",
      "allUserfriends",
      "allUserrestaurants",
      "allRestaurantusers",
      "allRestaurantuserreviews",
      "allRestaurantuserreviewpersonalizations",
      "getUserByName",
      "getRestaurantByName",
      "getUserfriendById",
      "getUserrestaurantById",
      "getRestaurantuserById",
      "getRestaurantuserreviewByUserId",
      "getRestaurantuserreviewpersonalizationByUserId",
      //( special case )
      "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId",
      "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId"
    ];
    queries.forEach((thatQuery: string) => {
      //describing resolver for datasource ( for get data from NEPTUNE )
      myLambda_datasource.createResolver({
        typeName: "Query",
        fieldName: thatQuery
      });
    });




    //adding env to lambdafunction
    myLambda.addEnvironment('WRITE_ADDRESS', writeAddress);
    myLambda.addEnvironment('READ_ADDRESS', readAddress);




    //create lambda once after database is created ( because lambda based on database )
    myLambda.node.addDependency(cluster);




    //rule fire by default event bus has target our lambdas
    const rule = new events.Rule(this, 'appsyncEventbridgeRule', {
      ruleName: 'dinningbyfriends-appsyncEventbridgeRule',
      description: 'created for appSyncEventbridge',
      eventPattern: {
        source: [EVENT_SOURCE],
        detailType: [...mutations]
        //every event that has source = "dinningbyfriends-events" will be sent to our lambdas
      },
      targets: [
        new targets.LambdaFunction(myLambda)
      ]
    });




//**************************COGNITO**************************/
    //creating userpool
    const userPool = new cognito.UserPool(this, 'dinningbyfriends-UserPool', {
      //user can sigin with 'email' & 'username' ( can also include phone, preferredUsername )
      signInAliases: {
        email: true,
        username: true
      },


      //defining policies for 'password' ( default policies are all true )
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false
      },


      //allow users for 'signup' to create account ( so not only administrator makes account )
      selfSignUpEnabled: true,


      //user can recover account with 'email' only ( can also include PHONE_ONLY, PHONE_AND_EMAIL, etc )
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,


      //verification while creating an account using 'email' by sending a verification code ( can also add phone )
      autoVerify: {
        email: true
      },


      //customize your 'email' & 'phone' verification messages
      userVerification: {
        emailSubject: 'Verify your email for dinningbyfriends app!',
        emailBody: 'Hello, Thanks for using dinningbyfriends app! Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE
      }
    });


    //creating 'Client' for connect COGNITO with frontend
    const userPoolClient = new cognito.UserPoolClient(this, 'dinningbyfriends-userPoolClient-amplify', {
      userPool
    });


    //send by userPool
    const userPoolId = new cdk.CfnOutput(this, 'dinningbyfriends-userPoolId', {
      value: userPool.userPoolId
    });


    //send by userPool
    const userPoolClientId = new cdk.CfnOutput(this, 'dinningbyfriends-userPoolClientId', {
      value: userPoolClient.userPoolClientId
    });
//**************************COGNITO**************************/




    //giving environmentvariable
    myLambda.addEnvironment('USERPOOL_ID', userPoolId.value);
    //giving role
    //*********************ROLE_COGNITO**********************/
    myLambda.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["cognito-idp:*"],
      resources: [userPool.userPoolArn],
    }));
    //*********************ROLE_COGNITO**********************/
  }
}
