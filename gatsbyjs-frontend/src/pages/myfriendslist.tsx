import React from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectIsUserSignedin } from '../toolkit/isUserSignedinSlice';
//PAGE404
import Page404 from '../components/_animatedPage404/Page404';
//COMPONENTS
import { MyfriendslistPage } from '../components';


export default function() {
    const isUserSignedin = useSelector(selectIsUserSignedin);
    if(!isUserSignedin) return <Page404/>; 

    return (
        <MyfriendslistPage
        />
    )
}