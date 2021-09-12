import createRestaurantuserreviewpersonalization from './createRestaurantuserreviewpersonalization';
import deleteRestaurantuserreviewpersonalization from './deleteRestaurantuserreviewpersonalization';
import editRestaurantuserreviewpersonalization from './editRestaurantuserreviewpersonalization';
import allRestaurantuserreviewpersonalizations from './allRestaurantuserreviewpersonalizations';
import getRestaurantuserreviewpersonalizationByUserId from './getRestaurantuserreviewpersonalizationByUserId';


export default async function handler(event: any) {

    if (
        event["detail-type"] === "createRestaurantuserreviewpersonalization"       //comes from HTTPdatasource as eventbridge
    ) {
        return await createRestaurantuserreviewpersonalization(event.detail);
    }
    else if (
        event["detail-type"] === "deleteRestaurantuserreviewpersonalization"       //comes from HTTPdatasource as eventbridge
    ) {
        return await deleteRestaurantuserreviewpersonalization(event.detail.p_id);
    }
    else if (
        event["detail-type"] === "editRestaurantuserreviewpersonalization"                  //comes from HTTPdatasource as a datasource
    ) {
        return await editRestaurantuserreviewpersonalization(event.detail);
    }
    else if (
        event?.info?.fieldName === "allRestaurantuserreviewpersonalizations"       //comes from lambda as a datasource
    ) {
        return await allRestaurantuserreviewpersonalizations(event.arguments);
    }
    else if (
        event?.info?.fieldName === "getRestaurantuserreviewpersonalizationByUserId"//comes from lambda as a datasource
    ) {
        return await getRestaurantuserreviewpersonalizationByUserId(event.arguments);
    }

    return null;
}