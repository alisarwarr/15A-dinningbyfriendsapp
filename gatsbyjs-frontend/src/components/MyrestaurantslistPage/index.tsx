import React, { useState, useEffect } from 'react';
import Card from '../RestaurantslistPage/Card';
//REACT-HELMET
import Head from '../Head';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
//REACT-BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//LOADER
import Loader from '../_animatedLoader/Loader';
//PAGE404
import Page404 from '../_animatedPage404/Page404';
//APPSYNC-QUERIES
import { fetchAllUserrestaurants } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUserrestaurant } from '../../appsync_functions/subscriptions';


function MyrestaurantslistPage() {
    const dark = useSelector(selectDark);
    const holdIdOfUserUntilSignedIn = useSelector(selectHoldIdOfUserUntilSignedIn);
    

    //fetching data from APPSYNC
    const [ allUserrestaurants, setAllUserrestaurants ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction = async() => {
            setAllUserrestaurants(await fetchAllUserrestaurants(holdIdOfUserUntilSignedIn));
        }

        //fetching for first time
        fetchFunction();

        //'subscription' for first time
        subscribeOnUserrestaurant(fetchFunction);    
    }, []);
    //fetching data from APPSYNC


    if(allUserrestaurants === false) {
        return <Loader/>;
    }

    else if(allUserrestaurants === null) {
        return <Page404/>;
    }

    return (
        <>
            <Head title="MyRestaurants List"/>

            <div className={`restaurantslistpage ${allUserrestaurants.length === 0 ? `d-flex justify-content-center align-items-center`: ``}`} id={dark ? "bg1" : "bg2"}>
                {
                    allUserrestaurants.length === 0 ? (
                        <div className="container d-flex justify-content-center">
                            <div className="alert alert-success p-5 w-75" role="alert">
                                <h4 className="alert-heading">No My Restaurants Exist!</h4>
                                <p>Oh yeah, you viewed an empty list of My Restaurants unfortunately becasue there is no Restaurants have created with you till yet.</p>
                                <hr/>
                                <p className="mb-0">Whenever you need to, be sure to visit this list of My Restaurants page to keep things know and understand.</p>
                            </div>
                        </div>
                    ) : (
                        <Container fluid>
                            <Row>
                                {
                                    allUserrestaurants.map(({
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

export default MyrestaurantslistPage;