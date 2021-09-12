import createUser from './createUser';
import deleteUser from './deleteUser';
import allUsers from './allUsers';
import getUserByName from './getUserByName';


export default async function handler(event: any) {

    if (
        event["detail-type"] === "createUser"           //comes from HTTPdatasource as eventbridge
    ) {
        return await createUser(event.detail);
    }
    else if (
        event["detail-type"] === "deleteUser"           //comes from HTTPdatasource as eventbridge
    ) {
        return await deleteUser(event.detail);
    }
    else if (
        event?.info?.fieldName === "allUsers"           //comes from lambda as a datasource
    ) {
        return await allUsers();
    }
    else if (
        event?.info?.fieldName === "getUserByName"      //comes from lambda as a datasource
    ) {
        return await getUserByName(event.arguments.name);
    }

    return null;
}