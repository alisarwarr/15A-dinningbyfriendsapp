import createRestaurantuserreview from './createRestaurantuserreview';
import deleteRestaurantuserreview from './deleteRestaurantuserreview';
import editRestaurantuserreview from './editRestaurantuserreview';
import allRestaurantuserreviews from './allRestaurantuserreviews';
import getRestaurantuserreviewByUserId from './getRestaurantuserreviewByUserId';


export default async function handler(event: any) {

    if (
        event["detail-type"] === "createRestaurantuserreview"       //comes from HTTPdatasource as eventbridge
    ) {
        return await createRestaurantuserreview(event.detail);
    }
    else if (
        event["detail-type"] === "deleteRestaurantuserreview"       //comes from HTTPdatasource as eventbridge
    ) {
        return await deleteRestaurantuserreview(event.detail.r_id);
    }
    else if (
        event["detail-type"] === "editRestaurantuserreview"         //comes from HTTPdatasource as a datasource
    ) {
        return await editRestaurantuserreview(event.detail);
    }
    else if (
        event?.info?.fieldName === "allRestaurantuserreviews"       //comes from lambda as a datasource
    ) {
        return await allRestaurantuserreviews(event.arguments.id);
    }
    else if (
        event?.info?.fieldName === "getRestaurantuserreviewByUserId"//comes from lambda as a datasource
    ) {
        return await getRestaurantuserreviewByUserId(event.arguments);
    }

    return null;
}