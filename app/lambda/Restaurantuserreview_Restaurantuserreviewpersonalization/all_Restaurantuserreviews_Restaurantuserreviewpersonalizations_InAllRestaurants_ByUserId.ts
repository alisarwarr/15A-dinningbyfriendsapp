const gremlin = require('gremlin');
import allRestaurants from '../Restaurant/allRestaurants';
import getRestaurantuserreviewByUserId from '../Restaurantuserreview/getRestaurantuserreviewByUserId';
import getRestaurantuserreviewpersonalizationByUserId from '../Restaurantuserreviewpersonalization/getRestaurantuserreviewpersonalizationByUserId';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


async function handler0() {
    return await allRestaurants();
}
async function handler1({ idFrom, idTo }) {
    return await getRestaurantuserreviewByUserId({ idFrom, idTo });
}
async function handler2({ idFrom, idTo, hisId }) {
    return await getRestaurantuserreviewpersonalizationByUserId({ idFrom, idTo, hisId });
}


async function all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(args) {
    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
    //grapping userreview for each restaurant
    //**************************************************************************************        
        var _allRestaurants = await handler0();
    //**************************************************************************************



        if(
            _allRestaurants === null
        ) {
            await dc.close();
            return null;            
        }

        else if(
            _allRestaurants.length === 0
        ) {
            await dc.close();
            return [];
        }

        else {
            //modified data
            let modifiedData = Array();
            //for each vertex's id iterate
            for(let {id: _id} of _allRestaurants) {
                //******************************************************************************************************************************
                /* grap review of that user in particular restaurant */
                var _getRestaurantuserreviewByUserId = await handler1({ idFrom: _id, idTo: args.id });
                //******************************************************************************************************************************
    
    
                if(
                    _getRestaurantuserreviewByUserId !== null
                 && _getRestaurantuserreviewByUserId !== undefined
                ) {
                    //******************************************************************************************************************************
                    /* grap review personalization of that user in particular restaurant */
                    var _getRestaurantuserreviewpersonalizationByUserId = await handler2({ idFrom: _id, idTo: _getRestaurantuserreviewByUserId.r_id, hisId: args.hisId });
                    //******************************************************************************************************************************
    
    
                    if(
                        _getRestaurantuserreviewpersonalizationByUserId === null
                     || _getRestaurantuserreviewpersonalizationByUserId === undefined
                    ) {
                        //pushing each id's row data to array 
                        modifiedData.push({ 
                            /*graphql schema type*/
                            _review: { ..._getRestaurantuserreviewByUserId }
                            /*graphql schema type*/
                        });
                    }
                    else if(
                        _getRestaurantuserreviewpersonalizationByUserId !== null
                     && _getRestaurantuserreviewpersonalizationByUserId !== undefined
                    ) {
                        //pushing each id's row data to array 
                        modifiedData.push({
                            /*graphql schema type*/
                            _review: { ..._getRestaurantuserreviewByUserId },
                            _personalization: { ..._getRestaurantuserreviewpersonalizationByUserId }
                            /*graphql schema type*/
                        });
                    }
                }
            }


            await dc.close();
            return modifiedData;
        }
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId;