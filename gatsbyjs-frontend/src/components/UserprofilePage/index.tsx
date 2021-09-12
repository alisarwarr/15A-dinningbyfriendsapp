import React, { useState, useEffect } from 'react';
import Card from './Card';
import ReviewsList from './ReviewsList';
//REACT-HELMET
import Head from '../Head';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
//LOADER
import Loader from '../_animatedLoader/Loader';
//PAGE404
import Page404 from '../_animatedPage404/Page404';
//REACH-ROUTER
import { useParams } from '@reach/router';
//APPSYNC-QUERIES
import { fetchGetUserByName } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUser } from '../../appsync_functions/subscriptions';


function UserprofilePage() {
    const dark = useSelector(selectDark);
    const params = useParams();  /*REACH-ROUTER hooks*/


    //fetching data from APPSYNC
    const [ getUserByName, setGetUserByName ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction = async() => {
            setGetUserByName(await fetchGetUserByName(params.name));
        }

        //fetching for first time
        fetchFunction();

        //'subscription' for first time
        subscribeOnUser(fetchFunction);
    }, []);
    //fetching data from APPSYNC


    if(getUserByName === false) {
        return <Loader/>;
    }

    else if(getUserByName === null) {
        return <Page404/>;
    }

    const {
        id,
        name
    } = getUserByName;

    return (
        <>
            <Head title="UserProfile"/>
            
            <div className="userprofilepage" id={dark ? "bg1" : "bg2"}>
                <Card
                    id={id}
                    name={name}
                />
                
                <ReviewsList
                    id={id}
                />
            </div>
        </>
    )
}

export default UserprofilePage;