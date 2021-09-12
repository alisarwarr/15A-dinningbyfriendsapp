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
import { fetchAllUsers } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUser } from '../../appsync_functions/subscriptions';


function UserslistPage() {
    const dark = useSelector(selectDark);


    //fetching data from APPSYNC
    const [ allUsers, setAllUsers ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction = async() => {
            setAllUsers(await fetchAllUsers());
        }

        //fetching for first time
        fetchFunction();

        //'subscription' for first time
        subscribeOnUser(fetchFunction);
    }, []);
    //fetching data from APPSYNC


    if(allUsers === false) {
        return <Loader/>;
    }

    else if(allUsers === null){
        return <Page404/>;
    }

    return (
        <>
            <Head title="Users List"/>

            <div className={`userslistpage ${allUsers.length === 0 ? `d-flex justify-content-center align-items-center`: ``}`} id={dark ? "bg1" : "bg2"}>
                {
                    allUsers.length === 0 ? (
                        <div className="container d-flex justify-content-center">
                            <div className="alert alert-success p-5 w-75" role="alert">
                                <h4 className="alert-heading">No User Exist!</h4>
                                <p>Oh yeah, you viewed an empty list of Users unfortunately becasue there is no User have created thier account till yet.</p>
                                <hr/>
                                <p className="mb-0">Whenever you need to, be sure to visit this list of Users page to keep things know and understand.</p>
                            </div>
                        </div>
                    ) : (
                        <Container fluid>
                            <Row>
                                {
                                    allUsers.map(({
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

export default UserslistPage;