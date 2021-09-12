import createUserrestaurant from './createUserrestaurant';
import deleteUserrestaurant from './deleteUserrestaurant';
import allUserrestaurants from './allUserrestaurants';
import getUserrestaurantById from './getUserrestaurantById';


export default async function handler(event: any) {

    if (
        event["detail-type"] === "createUserrestaurant"      //comes from HTTPdatasource as eventbridge
    ) {
        return await createUserrestaurant(event.detail);
    }
    else if (
        event["detail-type"] === "deleteUserrestaurant"      //comes from HTTPdatasource as eventbridge
    ) {
        return await deleteUserrestaurant(event.detail.id);
    }
    else if (
        event?.info?.fieldName === "allUserrestaurants"      //comes from lambda as a datasource
    ) {
        return await allUserrestaurants(event.arguments.id);
    }
    else if (
        event?.info?.fieldName === "getUserrestaurantById"   //comes from lambda as a datasource
    ) {
        return await getUserrestaurantById(event.arguments);
    }

    return null;
}