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
import { fetchGetRestaurantByName } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnRestaurant } from '../../appsync_functions/subscriptions';


function RestaurantprofilePage() {
    const dark = useSelector(selectDark);
    const params = useParams();  /*REACH-ROUTER hooks*/


    //fetching data from APPSYNC
    const [ getRestaurantByName, setGetRestaurantByName ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction = async() => {
            setGetRestaurantByName(await fetchGetRestaurantByName(params.name));
        }

        //fetching for first time
        fetchFunction();

        //'subscription' for first time
        subscribeOnRestaurant(fetchFunction);
    }, []);
    //fetching data from APPSYNC


    //making here gloablly for 'Card' & 'ReviewsList' component
    const [ input, setInput ] = useState<string>('');
    const [ isEditing, setIsEditing ] = useState<boolean>(false);


    if(getRestaurantByName === false) {
        return <Loader/>;
    }

    else if(getRestaurantByName === null) {
        return <Page404/>;
    }

    const {
        id,
        name,
        address,
        cuisine
    } = getRestaurantByName;

    return (
        <>
            <Head title="RestaurantProfile"/>

            <div className="restaurantprofilepage" id={dark ? "bg1" : "bg2"}>
                <Card
                    id={id}
                    name={name}
                    address={address}
                    cuisine={cuisine}
                    /* sending useState value & its Func ( for create purpose ) */
                    input={input}
                    setInput={setInput}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />

                <ReviewsList
                    id={id}
                    name={name}
                    /* sending useState value & its Func ( for edit purpose ) */
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                />
            </div>
        </>
    )
}

export default RestaurantprofilePage;