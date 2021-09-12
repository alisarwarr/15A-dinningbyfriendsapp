import React from 'react';
//REACH-ROUTER
import { Router, RouteComponentProps } from '@reach/router';
//COMPONENTS
import { UserprofilePage } from '../components';


export default function() {
    return (
        <Router basepath='/userprofile'>

            <RouterPage path="/:name" pageComponent={<UserprofilePage/>}/>

        </Router>
    )
}


//REACH-ROUTER-PAGE-COMPONENT
const RouterPage = (
   props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;