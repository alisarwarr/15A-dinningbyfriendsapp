const gremlin = require('gremlin');
import allRestaurantuserreviews from '../Restaurantuserreview/allRestaurantuserreviews';
import allRestaurantuserreviewpersonalizations from '../Restaurantuserreviewpersonalization/allRestaurantuserreviewpersonalizations';


const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const uri = process.env.WRITE_ADDRESS;


async function handler1(id: string) {
    return await allRestaurantuserreviews(id);
}
async function handler2({ id, hisId }) {
    return await allRestaurantuserreviewpersonalizations({ id, hisId });
}


async function all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId(args) {
//******************************************************************************************************************************
    var _allRestaurantuserreviews = await handler1(args.id);
//******************************************************************************************************************************



    let dc = new DriverRemoteConnection(`wss://${uri}/gremlin`, {});
    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    try {
        if(
            _allRestaurantuserreviews === null
        ) {
            await dc.close();
            return null;
        }

        else if(
            _allRestaurantuserreviews.length === 0
        ) {
            await dc.close();
            return [];
        }

        else {
            //******************************************************************************************************************************
            var _allRestaurantuserreviewpersonalizations = await handler2({ id: args.id, hisId: args.hisId });
            //******************************************************************************************************************************

            if(
                _allRestaurantuserreviewpersonalizations === null
            ) {
                /*graphql schema type*/
                _allRestaurantuserreviews = _allRestaurantuserreviews.map(obj => { return { _review: {...obj} } });
                /*graphql schema type*/

                await dc.close();
                return _allRestaurantuserreviews;
            }

            else if(
                _allRestaurantuserreviewpersonalizations.length === 0
            ) {
                /*graphql schema type*/
                _allRestaurantuserreviews = _allRestaurantuserreviews.map(obj => { return { _review: {...obj} } });
                /*graphql schema type*/

                await dc.close();
                return _allRestaurantuserreviews;
            }

            else {
                /*graphql schema type*/
                _allRestaurantuserreviews = _allRestaurantuserreviews.map(obj => { return { _review: {...obj} } });
                /*graphql schema type*/                    


                //******************************************************************************************************************************
                    /* check one by one for every review */
                    for(var {_review: obj} of _allRestaurantuserreviews) {
                        /* check one by one for every review */
                        const result = _allRestaurantuserreviewpersonalizations
                                     /* check that any ( personalization review id ) is same as ( review id ) or not */
                                       .filter(({ p_reviewId_ExistInReviewsVertex }) => p_reviewId_ExistInReviewsVertex === obj.r_id)[0]


                        /* if same then replace ( review ) with ( review with personlizations ) */
                        if(result !== undefined) {
                            /* hold that particular ( review ) */
                            const hold = _allRestaurantuserreviews
                                         .filter(({ _review: { r_id } }) => r_id === obj.r_id)[0];

                            /* remove that particular ( review ) */
                            _allRestaurantuserreviews = _allRestaurantuserreviews
                                                        .filter(({ _review: { r_id } }) => r_id !== obj.r_id);
                  
                            /* add that particular ( review with personalization ) */
                            _allRestaurantuserreviews.push({
                                ...hold,
                                _personalization: { ...result }
                            });
                        }
                    }                  
                //******************************************************************************************************************************


                await dc.close();
                return _allRestaurantuserreviews;
            }
        }
    }
    catch(err) {
        console.log('ERROR', err);
        return null;
    }
}

export default all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId;