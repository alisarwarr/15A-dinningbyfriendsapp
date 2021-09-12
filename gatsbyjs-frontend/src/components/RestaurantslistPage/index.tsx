import React, { useState, useEffect } from 'react';
import Card from './Card';
//REACT-HELMET
import Head from '../Head';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
//REACT-BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//LOADER
import Loader from '../_animatedLoader/Loader';
//PAGE404
import Page404 from '../_animatedPage404/Page404';
//APPSYNC-QUERIES
import { fetchAllRestaurants } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnRestaurant } from '../../appsync_functions/subscriptions';


function RestaurantslistPage() {
    const dark = useSelector(selectDark);


    //fetching data from APPSYNC
    const [ allRestaurants, setAllRestaurants ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction = async() => {
            setAllRestaurants(await fetchAllRestaurants());
        }

        //fetching for first time
        fetchFunction();

        //'subscription' for first time
        subscribeOnRestaurant(fetchFunction);
    }, []);
    //fetching data from APPSYNC


    if(allRestaurants === false) {
        return <Loader/>;
    }

    else if(allRestaurants === null){
        return <Page404/>;
    }

    return (
        <>
            <Head title="Restaurants"/>

            <div className={`restaurantslistpage ${allRestaurants.length === 0 ? `d-flex justify-content-center align-items-center`: ``}`} id={dark ? "bg1" : "bg2"}>
                {
                    allRestaurants.length === 0 ? (
                        <div className="container d-flex justify-content-center">
                            <div className="alert alert-success p-5 w-75" role="alert">
                                <h4 className="alert-heading">No Restaurant Exist!</h4>
                                <p>Oh yeah, you viewed an empty list of Restaurants unfortunately becasue there is no Restaurant have created thier entry till yet.</p>
                                <hr/>
                                <p className="mb-0">Whenever you need to, be sure to visit this list of Restaurants page to keep things know and understand.</p>
                            </div>
                        </div>
                    ) : (
                        <Container fluid>
                            <Row>
                                {
                                    allRestaurants.map(({
                                        id,
                                        name,
                                        address,
                                        cuisine
                                    }) => (
                                        <Card
                                            key={id}
                                            id={id}
                                            name={name}
                                            address={address}
                                            cuisine={cuisine}
                                        />
                                    ))
                                }
                            </Row>
                        </Container>                            
                    )
                }
            </div>
        </>
    )
}

export default RestaurantslistPage;