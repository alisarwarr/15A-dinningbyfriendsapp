import createUserfriend from './createUserfriend';
import deleteUserfriend from './deleteUserfriend';
import allUserfriends from './allUserfriends';
import getUserfriendById from './getUserfriendById';


export default async function handler(event: any) {

    if (
        event["detail-type"] === "createUserfriend"       //comes from HTTPdatasource as eventbridge
    ) {
        return await createUserfriend(event.detail);
    }
    else if (
        event["detail-type"] === "deleteUserfriend"       //comes from HTTPdatasource as eventbridge
    ) {
        return await deleteUserfriend(event.detail.id);
    }
    else if (
        event?.info?.fieldName === "allUserfriends"       //comes from lambda as a datasource
    ) {
        return await allUserfriends(event.arguments.id);
    }
    else if (
        event?.info?.fieldName === "getUserfriendById"    //comes from lambda as a datasource
    ) {
        return await getUserfriendById(event.arguments);
    }

    return null;
}