//AWS-AMPLIFY
import { API } from 'aws-amplify';
import {
    allUsers, getUserByName,
    allRestaurants, getRestaurantByName,
    allUserfriends, getUserfriendById,
    allUserrestaurants, getUserrestaurantById, getRestaurantuserreviewByUserId,
    allRestaurantusers,
    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId, allRestaurantuserreviews,
    all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId
} from '../../graphql/queries';







export const fetchAllUsers = async() => {
    const { data } = await API.graphql({ query: allUsers });
    return data.allUsers;
}

export const fetchGetUserByName = async(name: string) => {
    const { data } = await API.graphql({
        query: getUserByName,
        variables: {
            name
        }
    });
    return data.getUserByName;
}







export const fetchAllRestaurants = async() => {
    const { data } = await API.graphql({ query: allRestaurants });
    return data.allRestaurants;
}

export const fetchGetRestaurantByName = async(name: string) => {
    const { data } = await API.graphql({
        query: getRestaurantByName,
        variables: {
            name
        }
    });
    return data.getRestaurantByName;
}







export const fetchAllUserfriends = async(id: string) => {
    const { data } = await API.graphql({
        query: allUserfriends,
        variables: {
            id
        }
    });
    return data.allUserfriends;
}

export const fetchGetUserfriendById = async({ idFrom, idTo }) => {
    const { data } = await API.graphql({
        query: getUserfriendById,
        variables: {
            idFrom,
            idTo
        }
    });
    return data.getUserfriendById;
}







export const fetchAllUserrestaurants = async(id: string) => {
    const { data } = await API.graphql({
        query: allUserrestaurants,
        variables: {
            id
        }
    });
    return data.allUserrestaurants;
}

export const fetchGetUserrestaurantById = async({ idFrom, idTo }) => {
    const { data } = await API.graphql({
        query: getUserrestaurantById,
        variables: {
            idFrom,
            idTo
        }
    });
    return data.getUserrestaurantById;
}

export const fetchGetRestaurantuserreviewByUserId = async({ idFrom, idTo }) => {
    const { data } = await API.graphql({
        query: getRestaurantuserreviewByUserId,
        variables: {
            idFrom,
            idTo
        }
    });
    return data.getRestaurantuserreviewByUserId;
}







export const fetchAllRestaurantusers = async(id: string) => {
    const { data } = await API.graphql({
        query: allRestaurantusers,
        variables: {
            id
        }
    });
    return data.allRestaurantusers;
}







export const fetchAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId = async({ id, hisId }) => {
    const { data } = await API.graphql({
        query: all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId,
        variables: {
            id,
            hisId
        }
    });
    return data.all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InOneRestaurant_ByUserId;
}

export const fetchAllRestaurantuserreviews = async(id: string) => {
    const { data } = await API.graphql({
        query: allRestaurantuserreviews,
        variables: {
            id
        }
    });
    return data.allRestaurantuserreviews;
}







export const fetchAll_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId = async({ id, hisId }) => {
    const { data } = await API.graphql({
        query: all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId,
        variables: {
            id,
            hisId
        }
    });
    return data.all_Restaurantuserreviews_Restaurantuserreviewpersonalizations_InAllRestaurants_ByUserId;
}