import React from 'react';
//REACH-ROUTER
import { Router, RouteComponentProps } from '@reach/router';
//COMPONENTS
import { RestaurantprofilePage } from '../components';


export default function() {
    return (
        <Router basepath='/restaurantprofile'>

            <RouterPage path="/:name" pageComponent={<RestaurantprofilePage/>}/>

        </Router>
    )
}


//REACH-ROUTER-PAGE-COMPONENT
const RouterPage = (
   props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;