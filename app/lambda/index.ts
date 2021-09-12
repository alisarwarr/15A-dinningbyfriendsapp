import User from './User/index';
import Restaurant from './Restaurant';
import Userfriend from './Userfriend';
import Userrestaurant from './Userrestaurant';
import Restaurantuser from './Restaurantuser';
import Restaurantuserreview from './Restaurantuserreview';
import Restaurantuserreviewpersonalization from './Restaurantuserreviewpersonalization';
import Restaurantuserreview_Restaurantuserreviewpersonalization from './Restaurantuserreview_Restaurantuserreviewpersonalization';


exports.handler = async(event: any) => {

    if (
           event["detail-type"] === "createUser"
        || event["detail-type"] === "deleteUser"
        || event?.info?.fieldName === "allUsers"
        || event?.info?.fieldName === "getUserByName"
    ) {
        return await User(event);
    }

    else if(
           event["detail-type"] === "createRestaurant"
        || event["detail-type"] === "deleteRestaurant"
        || event?.info?.fieldName === "allRestaurants"
        || event?.info?.fieldName === "getRestaurantByName"
    ) {
        return await Restaurant(event);

    }

    else if(
           event["detail-type"] === "createUserfriend"
        || event["detail-type"] === "deleteUserfriend"
        || event?.info?.fieldName === "allUserfriends"
        || event?.info?.fieldName === "getUserfriendById"
    ) {
        return await Userfriend(event);
    }

    else if(
           event["detail-type"] === "createUserrestaurant"
        || event["detail-type"] === "deleteUserrestaurant"
        || event?.info?.fieldName === "allUserrestaurants"
        || event?.info?.fieldName === "getUserrestaurantById"
    ) {
        return await Userrestaurant(event);
    }

    else if(
           event["detail-type"] === "createRestaurantuser"
        || event["detail-type"] === "deleteRestaurantuser"
        || event?.info?.fieldName === "allRestaurantusers"
        || event?.info?.fieldName === "getRestaurantuserById"
    ) {
        return await Restaurantuser(event);
    }

    else if(
           event["detail-type"] === "createRestaurantuserreview"
        || event["detail-type"] === "deleteRestaurantuserreview"
        || event["detail-type"] === "editRestaurantuserreview"
        || event?.info?.fieldName === "allRestaurantuserreviews"
        || event?.info?.fieldName === "getRestaurantuserreviewByUserId"
    ) {
        return await Restaurantuserreview(event);
    }

    else if(
           event["detail-type"] === "createRestaurantuserreviewpersonalization"
        || event["detail-type"] === "deleteRestaurantuserreviewpersonalization"
        || event["detail-type"] === "editRestaurantuserreviewpersonalization"
        || event?.info?.fieldName === "allRestaurantuserreviewpersonalizations"
        || event?.info?.fieldName === "getRestaurantuserreviewpersonalizationByUserId"
    ) {
        return await Restaurantuserreviewpersonalization(event);
    }

    else if(
           event?.info?.fieldName === "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId"
        || event?.info?.fieldName === "all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId"
    ) {
        return await Restaurantuserreview_Restaurantuserreviewpersonalization(event);
    }

    return null;
}