import React from 'react';
//REACH-ROUTER
import { Router, RouteComponentProps } from '@reach/router';
//COMPONENTS
import { HisfriendslistPage } from '../components';


export default function() {
    return (
        <Router basepath='/hisfriendslist'>

            <RouterPage path="/:id" pageComponent={<HisfriendslistPage/>}/>

        </Router>
    )
}


//REACH-ROUTER-PAGE-COMPONENT
const RouterPage = (
   props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;