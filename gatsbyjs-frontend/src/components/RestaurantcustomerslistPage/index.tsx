import React, { useState, useEffect } from 'react';
import Card from '../UserslistPage/Card';
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
//REACH-ROUTER
import { useParams } from '@reach/router';
//APPSYNC-QUERIES
import { fetchAllRestaurantusers } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnRestaurantUser } from '../../appsync_functions/subscriptions';


function RestaurantcustomerslistPage() {
    const dark = useSelector(selectDark);
    const params = useParams();  /*REACH-ROUTER hooks*/


    //fetching data from APPSYNC
    const [ allRestaurantusers, setAllRestaurantusers ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction = async() => {
            setAllRestaurantusers(await fetchAllRestaurantusers(params.id));
        }

        //fetching for first time
        fetchFunction();

        //'subscription' for first time
        subscribeOnRestaurantUser(fetchFunction);
    }, []);
    //fetching data from APPSYNC


    if(allRestaurantusers === false) {
        return <Loader/>;
    }

    else if(allRestaurantusers === null) {
        return <Page404/>;
    }

    return (
        <>
            <Head title="RestaurantCustomers List"/>

            <div className={`userslistpage ${allRestaurantusers.length === 0 ? `d-flex justify-content-center align-items-center`: ``}`} id={dark ? "bg1" : "bg2"}>
                {
                    allRestaurantusers.length === 0 ? (
                        <div className="container d-flex justify-content-center">
                            <div className="alert alert-success p-5 w-75" role="alert">
                                <h4 className="alert-heading">No Restaurant Customers Exist!</h4>
                                <p>Oh yeah, you viewed an empty list of Restaurant Customers unfortunately becasue there is no Friends have created with you till yet.</p>
                                <hr/>
                                <p className="mb-0">Whenever you need to, be sure to visit this list of Restaurant Customers page to keep things know and understand.</p>
                            </div>
                        </div>
                    ) : (
                        <Container fluid>
                            <Row>
                                {
                                    allRestaurantusers.map(({
                                        id,
                                        name
                                    }) => {
                                        return (
                                            <Card
                                                key={id}
                                                id={id}
                                                name={name}
                                            />
                                        )
                                    })
                                }
                            </Row>
                        </Container>
                    )
                }
            </div>
        </>
    )
}

export default RestaurantcustomerslistPage;