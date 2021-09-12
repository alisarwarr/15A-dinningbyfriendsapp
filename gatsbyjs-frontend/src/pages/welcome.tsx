import React from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectIsUserSignedin } from '../toolkit/isUserSignedinSlice';
//REACH-ROUTER
import { Router, RouteComponentProps } from '@reach/router';
//PAGE404
import Page404 from '../components/_animatedPage404/Page404';
//COMPONENTS
import { WelcomePage } from '../components';


export default function() {
    const isUserSignedin = useSelector(selectIsUserSignedin);
    if(!isUserSignedin) return <Page404/>; 

    return (
        <Router basepath='/welcome'>

            <RouterPage path="/:name" pageComponent={<WelcomePage/>}/>

        </Router>
    )
}


//REACH-ROUTER-PAGE-COMPONENT
const RouterPage = (
   props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;