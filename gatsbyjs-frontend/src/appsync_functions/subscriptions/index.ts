//AWS-AMPLIFY
import { API } from 'aws-amplify';
import {
    onCreateUser, onDeleteUser,
    onCreateRestaurant, onDeleteRestaurant,
    onCreateUserfriend, onDeleteUserfriend,
    onCreateUserrestaurant, onDeleteUserrestaurant,
    onCreateRestaurantuser, onDeleteRestaurantuser,
    onCreateRestaurantuserreview, onDeleteRestaurantuserreview, onEditRestaurantuserreview,
    onCreateRestaurantuserreviewpersonalization, onDeleteRestaurantuserreviewpersonalization, onEditRestaurantuserreviewpersonalization
} from '../../graphql/subscriptions';







export const subscribeOnUser = (fetchFunction: Function) => {
    API.graphql({ query: onCreateUser })
    .subscribe({
        next: () => { fetchFunction(); }
    });

    API.graphql({ query: onDeleteUser })
    .subscribe({
        next: () => { fetchFunction(); }
    });
}

export const subscribeOnRestaurant = (fetchFunction: Function) => {
    API.graphql({ query: onCreateRestaurant })
    .subscribe({
        next: () => { fetchFunction(); }
    });   

    API.graphql({ query: onDeleteRestaurant })
    .subscribe({
        next: () => { fetchFunction(); }
    });
}

export const subscribeOnUserfriend = (fetchFunction: Function) => {
    API.graphql({ query: onCreateUserfriend })
    .subscribe({
        next: () => { fetchFunction(); }
    });

    API.graphql({ query: onDeleteUserfriend })
    .subscribe({
        next: () => { fetchFunction(); }
    });
}

export const subscribeOnUserrestaurant = (fetchFunction: Function) => {
    API.graphql({ query: onCreateUserrestaurant })
    .subscribe({
        next: () => { fetchFunction(); }
    });   

    API.graphql({ query: onDeleteUserrestaurant })
    .subscribe({
        next: () => { fetchFunction(); }
    });
}

export const subscribeOnRestaurantUser = (fetchFunction: Function) => {
    API.graphql({ query: onCreateRestaurantuser })
    .subscribe({
        next: () => { fetchFunction(); }
    });

    API.graphql({ query: onDeleteRestaurantuser })
    .subscribe({
        next: () => { fetchFunction(); }
    });
}

export const subscribeOnRestaurantuserreview = (fetchFunction: Function) => {
    API.graphql({ query: onCreateRestaurantuserreview })
    .subscribe({
        next: () => { fetchFunction(); }
    });   

    API.graphql({ query: onDeleteRestaurantuserreview })
    .subscribe({
        next: () => { fetchFunction(); }
    });

    API.graphql({ query: onEditRestaurantuserreview })
    .subscribe({
        next: () => { fetchFunction(); }
    });
}

export const subscribeOnRestaurantuserreviewpersonalization = (fetchFunction: Function) => {
    API.graphql({ query: onCreateRestaurantuserreviewpersonalization })
    .subscribe({
        next: () => { fetchFunction(); }
    });   

    API.graphql({ query: onDeleteRestaurantuserreviewpersonalization })
    .subscribe({
        next: () => { fetchFunction(); }
    });

    API.graphql({ query: onEditRestaurantuserreviewpersonalization })
    .subscribe({
        next: () => { fetchFunction(); }
    });
}