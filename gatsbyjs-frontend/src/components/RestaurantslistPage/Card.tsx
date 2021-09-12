import React, { useState, useEffect } from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectIsUserSignedin } from '../../toolkit/isUserSignedinSlice';
import { selectHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
//MATERIAL-UI
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//REACT-BOOTSTRAP
import Col from 'react-bootstrap/Col';
//GATSBY
import { navigate } from 'gatsby';
//IMAGE
import { pic6 } from '../../images';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
/* in case of user is currently SignedIn in the application */
//APPSYNC-MUTATIONS
import { handleCreateUserrestaurant, handleDeleteUserrestaurant } from '../../appsync_functions/mutations';
//APPSYNC-QUERIES
import { fetchGetUserrestaurantById } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUserrestaurant } from '../../appsync_functions/subscriptions';
/* in case of user is currently SignedIn in the application */


type CardProps = {
    id: string;
    name: string;
    address: string;
    cuisine: string;
}

function Card({
    id,
    name,
    address,
    cuisine
}: CardProps) {
    const dark = useSelector(selectDark);
    const isUserSignedin = useSelector(selectIsUserSignedin);
    const holdIdOfUserUntilSignedIn = useSelector(selectHoldIdOfUserUntilSignedIn);


    //for circularprogress loading whenever 'mutation' called onClick ( only update purpose )
    const [ processLoading, setProcessLoading ] = useState<any>(false);


/* in case of user is currently SignedIn in the application */
    const [ getUserrestaurantById, setGetUserrestaurantById ] = useState<any>(false);
    //fetching data from APPSYNC
    useEffect(() => {
        if(isUserSignedin) {
            const fetchFunction = async() => {
                setGetUserrestaurantById(await fetchGetUserrestaurantById({
                    idFrom : holdIdOfUserUntilSignedIn,
                    idTo   : id
                }));


                /* disable circularprogress loading ( actual logic after first fetch whenever mutation onClick trigger for refetch ) */
                setProcessLoading(false);
            }
    
            //fetching for first time
            fetchFunction();
    
            //'subscription' for first time
            subscribeOnUserrestaurant(fetchFunction);    
        }
    }, []);
    //fetching data from APPSYNC
/* in case of user is currently SignedIn in the application */


    const screen650 = useMediaQuery('(max-width:650px)');
    const screen265 = useMediaQuery('(max-width:265px)');


    return (
        <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center align-items-center">
            <Zoom>
            <div className="card m-1 rounded border border-2 border-light w-100 mw-100 mt-4 shadow-sm">
                <img src={pic6} className="card-img-top"/>

                <div className="card-body" style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}>
                    <h5 className="card-title fw-bold" style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                        {name}
                    </h5>

                    <p className="card-text" style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                        {address} | {cuisine}
                    </p>

                    <button
                        className={`btn btn-${screen650 ? `sm`: `md`} d-flex justify-content-center align-items-center`}
                        style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "100%" }}
                        onClick={() => {
                            navigate(`/restaurantprofile/${name}`);
                        }}
                    >
                        <span> {!screen265 && `Profile`} View </span>
                        <VisibilityIcon fontSize="small" style={{ marginLeft: "0.625rem", marginTop: "0.125rem" }}/>
                    </button>

                    {/* in case of user is currently SignedIn in the application */
                        isUserSignedin && (
                            <button
                                className={`btn btn-${screen650 ? `sm`: `md`} mt-2 d-flex justify-content-center align-items-center`}
                                style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "100%" }}
                                onClick={async() => {
                                    /* data have fetched for check particular restaurant his restaurant or not */
                                    getUserrestaurantById === null
                                    ?   await handleCreateUserrestaurant({
                                            idFrom : holdIdOfUserUntilSignedIn,
                                            idTo   : id
                                        })
                                    :   await handleDeleteUserrestaurant(
                                           getUserrestaurantById.edge_id
                                        )


                                    /* enable circularprogress loading */
                                    setProcessLoading(true);
                                }}
                                disabled={
                                     getUserrestaurantById === false   /* initially fetching data */
                                  || processLoading                    /* while mutation onClick trigger for refetch */
                                }
                            >
                                {
                                    (
                                        getUserrestaurantById === false  /* initially fetching data */
                                     || processLoading                   /* while mutation onClick trigger for refetch */
                                    ) ? (
                                        <CircularProgress size="1.655rem" style={{ color: dark ? "#d4d3d3" : "#000000" }}/>
                                    ) : (
                                        /* data have fetched for check particular restaurant his restaurant or not */
                                        <>
                                            <span>
                                            {
                                                getUserrestaurantById === null
                                                ? `Add${!screen265 ? ` Restaurant` : ``}`
                                                : `Remove${!screen265 ? ` Restaurant` : ``}`
                                            }
                                            </span>
                                            {
                                                getUserrestaurantById === null
                                                ? <AddCircleIcon fontSize="small" style={{ marginLeft: "0.625rem", marginTop: "0.125rem" }}/>
                                                : <RemoveCircleIcon fontSize="small" style={{ marginLeft: "0.625rem", marginTop: "0.125rem" }}/>
                                            }
                                        </>
                                    )
                                }
                            </button>
                        )
                    }
                </div>
            </div>
            </Zoom>
        </Col>
    )
}

export default Card;