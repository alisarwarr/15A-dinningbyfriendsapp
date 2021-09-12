import all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId from './all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId';
import all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId from './all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId';


export default async function handler(event: any) {

    if (
        event?.info?.fieldName === "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId"        //comes from lambda as a datasource
    ) {
        return await all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId(event.arguments);
    }
    else if (
        event?.info?.fieldName === "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId"       //comes from lambda as a datasource
    ) {
        return await all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId(event.arguments);
    }

    return null;
}