import React from 'react';
//REACH-ROUTER
import { Router, RouteComponentProps } from '@reach/router';
//COMPONENTS
import { HisrestaurantslistPage } from '../components';


export default function() {
    return (
        <Router basepath='/hisrestaurantslist'>

            <RouterPage path="/:id" pageComponent={<HisrestaurantslistPage/>}/>

        </Router>
    )
}


//REACH-ROUTER-PAGE-COMPONENT
const RouterPage = (
   props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;