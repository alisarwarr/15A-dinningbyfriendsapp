import createRestaurant from './createRestaurant';
import deleteRestaurant from './deleteRestaurant';
import allRestaurants from './allRestaurants';
import getRestaurantByName from './getRestaurantByName';


export default async function handler(event: any) {

    if (
        event["detail-type"] === "createRestaurant"       //comes from HTTPdatasource as eventbridge
    ) {
        return await createRestaurant(event.detail);
    }
    else if (
        event["detail-type"] === "deleteRestaurant"       //comes from HTTPdatasource as eventbridge
    ) {
        return await deleteRestaurant(event.detail.id);
    }
    else if (
        event?.info?.fieldName === "allRestaurants"       //comes from lambda as a datasource
    ) {
        return await allRestaurants();
    }
    else if (
        event?.info?.fieldName === "getRestaurantByName"  //comes from lambda as a datasource
    ) {
        return await getRestaurantByName(event.arguments.name);
    }

    return null;
}