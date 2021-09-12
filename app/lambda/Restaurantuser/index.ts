import createRestaurantuser from './createRestaurantuser';
import deleteRestaurantuser from './deleteRestaurantuser';
import allRestaurantusers from './allRestaurantusers';
import getRestaurantuserById from './getRestaurantuserById';


export default async function handler(event: any) {

    if (
        event["detail-type"] === "createRestaurantuser"      //comes from HTTPdatasource as eventbridge
    ) {
        return await createRestaurantuser(event.detail);
    }
    else if (
        event["detail-type"] === "deleteRestaurantuser"      //comes from HTTPdatasource as eventbridge
    ) {
        return await deleteRestaurantuser(event.detail.id);
    }
    else if (
        event?.info?.fieldName === "allRestaurantusers"      //comes from lambda as a datasource
    ) {
        return await allRestaurantusers(event.arguments.id);
    }
    else if (
        event?.info?.fieldName === "getRestaurantuserById"   //comes from lambda as a datasource
    ) {
        return await getRestaurantuserById(event.arguments);
    }

    return null;
}