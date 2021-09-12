import React from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectIsUserSignedin } from '../toolkit/isUserSignedinSlice';
//DELAY-RENDER
import DelayRender from '../components/DelayRender';
//PAGE404
import Page404 from '../components/_animatedPage404/Page404';
//COMPONENTS
import { SigninPage } from '../components';


export default function() {
    const isUserSignedin = useSelector(selectIsUserSignedin);
    if(isUserSignedin) return <DelayRender> <Page404/> </DelayRender>; //delaying 404 page

    return (
        <SigninPage
        />
    )
}