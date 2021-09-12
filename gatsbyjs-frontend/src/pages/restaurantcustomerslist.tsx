import React from 'react';
//REACH-ROUTER
import { Router, RouteComponentProps } from '@reach/router';
//COMPONENTS
import { RestaurantcustomerslistPage } from '../components';


export default function() {
    return (
        <Router basepath='/restaurantcustomerslist'>

            <RouterPage path="/:id" pageComponent={<RestaurantcustomerslistPage/>}/>

        </Router>
    )
}


//REACH-ROUTER-PAGE-COMPONENT
const RouterPage = (
   props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;