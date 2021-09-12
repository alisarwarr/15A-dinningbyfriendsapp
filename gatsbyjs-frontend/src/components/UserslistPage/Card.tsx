import React, { useState, useEffect } from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectIsUserSignedin } from '../../toolkit/isUserSignedinSlice';
import { selectHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
//MATERIAL-UI
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//REACT-BOOTSTRAP
import Col from 'react-bootstrap/Col';
//GATSBY
import { navigate } from 'gatsby';
//IMAGE
import { pic5 } from '../../images';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
/* in case of user is currently SignedIn in the application */
//APPSYNC-MUTATIONS
import { handleCreateUserfriend, handleDeleteUserfriend } from '../../appsync_functions/mutations';
//APPSYNC-QUERIES
import { fetchGetUserfriendById } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUserfriend } from '../../appsync_functions/subscriptions';
/* in case of user is currently SignedIn in the application */


type CardProps = {
    id: string;
    name: string;
}

function Card({
    id,
    name
}: CardProps) {
    const dark = useSelector(selectDark);
    const isUserSignedin = useSelector(selectIsUserSignedin);
    const holdIdOfUserUntilSignedIn = useSelector(selectHoldIdOfUserUntilSignedIn);


    //for circularprogress loading whenever 'mutation' called onClick ( only update purpose )
    const [ processLoading, setProcessLoading ] = useState<any>(false);


/* in case of user is currently SignedIn in the application */
    const [ getUserfriendById, setGetUserfriendById ] = useState<any>(false);
    //fetching data from APPSYNC
    useEffect(() => {
        if(isUserSignedin) {
            const fetchFunction = async() => {
                setGetUserfriendById(await fetchGetUserfriendById({
                    idFrom : holdIdOfUserUntilSignedIn,
                    idTo   : id
                }));


                /* disable circularprogress loading ( actual logic after first fetch whenever mutation onClick trigger for refetch ) */
                setProcessLoading(false);
            }
    
            //fetching for first time
            fetchFunction();
    
            //'subscription' for first time
            subscribeOnUserfriend(fetchFunction);    
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
                <img src={pic5} className="card-img-top"/>

                <div className="card-body" style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}>
                    <h5 className="card-title fw-bold" style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                        {(id === holdIdOfUserUntilSignedIn) ? `Me As User` : name}
                    </h5>

                    <p className="card-text" style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                        USER | {id}
                    </p>

                    <button
                        className={`btn btn-${screen650 ? `sm`: `md`} d-flex justify-content-center align-items-center`}
                        style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "100%" }}
                        onClick={() => {
                            navigate(`/userprofile/${name}`);
                        }}
                        disabled={
                            (isUserSignedin && id === holdIdOfUserUntilSignedIn)  /* for SignedIn user not consider */
                        }
                    >
                        <span style={{ visibility: (isUserSignedin && id === holdIdOfUserUntilSignedIn) ? "hidden" : "visible", overflow: "hidden", marginTop: 4.8 }}>
                            <span> {!screen265 && ` Profile`} View </span>
                            <VisibilityIcon fontSize="small" style={{ marginLeft: "0.625rem" }}/>
                        </span>
                    </button>

                    {/* in case of user is currently SignedIn in the application */
                        isUserSignedin && (
                            <button
                                className={`btn btn-${screen650 ? `sm`: `md`} mt-2 d-flex justify-content-center align-items-center`}
                                style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "100%" }}
                                onClick={async() => {
                                    /* data have fetched for check particular user his friend or not */
                                    getUserfriendById === null
                                    ?   await handleCreateUserfriend({
                                            idFrom : holdIdOfUserUntilSignedIn,
                                            idTo   : id
                                        })
                                    :   await handleDeleteUserfriend(
                                            getUserfriendById.edge_id
                                        )


                                    /* enable circularprogress loading */
                                    setProcessLoading(true);
                                }}
                                disabled={
                                     id === holdIdOfUserUntilSignedIn  /* for SignedIn user not consider */
                                  || getUserfriendById === false       /* initially fetching data */
                                  || processLoading                    /* while mutation onClick trigger for refetch */
                                }
                            >
                                <span style={{ visibility: (id === holdIdOfUserUntilSignedIn) ? "hidden" : "visible", overflow: "hidden", marginTop: 4.8 }}>
                                {
                                    (
                                        getUserfriendById === false    /* initially fetching data */
                                     || processLoading                 /* while mutation onClick trigger for refetch */
                                    ) ? (
                                        <CircularProgress size="1.655rem" style={{ color: dark ? "#d4d3d3" : "#000000" }}/>
                                    ) : (
                                        /* data have fetched for check particular user his friend or not */
                                        <>
                                            <span>
                                            {
                                                getUserfriendById === null
                                                ? `Add${!screen265 ? ` Friend` : ``}`
                                                : `Remove${!screen265 ? ` Friend` : ``}`
                                            }
                                            </span>
                                            {
                                                getUserfriendById === null
                                                ? <PersonAddIcon fontSize="small" style={{ marginLeft: "0.625rem" }}/>
                                                : <PersonAddDisabledIcon fontSize="small" style={{ marginLeft: "0.625rem" }}/>
                                            }
                                        </>
                                    )
                                }
                                </span>
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