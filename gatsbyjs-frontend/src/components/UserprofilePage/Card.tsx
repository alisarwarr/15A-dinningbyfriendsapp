import React, { useState, useEffect } from 'react';
//MATERIAL-UI
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
import { selectIsUserSignedin } from '../../toolkit/isUserSignedinSlice';
import { selectHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
//GATSBY
import { navigate } from 'gatsby';
//SWEETALERT2
import { darkAlert } from '../../alerts';
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
    const dispatch = useDispatch();


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


    const screen750 = useMediaQuery('(max-width:750px)');
    const screen650 = useMediaQuery('(max-width:650px)');
    const screen210 = useMediaQuery('(max-width:210px)');


    return (
        <Zoom>
        <div
            className={`jumbotron rounded border border-light border-3`}
            style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}
        >
            <h1 className="display-4" style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                {name}
            </h1>

            <p style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                {id} | {name}
            </p>

            <hr className="my-4"/>

            <Button
                className={`d-flex justify-content-center align-items-center rounded-3 mt-3 fw-bold`}
                size={`${screen650 ? `small`: `medium`}`}
                style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "90%", height: "10%", fontSize: screen750 ? "0.7rem" : "0.9rem" }}
                onClick={() => {
                    navigate(`/hisfriendslist/${id}`);
                }}
            >
                <span> Friends List </span>
                <PeopleAltIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
            </Button>

            <Button
                className={`d-flex justify-content-center align-items-center rounded-3 mt-3 fw-bold`}
                size={`${screen650 ? `small`: `medium`}`}
                style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "90%", height: "10%", fontSize: screen750 ? "0.7rem" : "0.9rem" }}
                onClick={() => {
                    navigate(`/hisrestaurantslist/${id}`);
                }}
            >
                <span> Restaurants List </span>
                <RestaurantMenuIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
            </Button>

            {/* in case of user is currently SignedIn in the application */
                isUserSignedin && (
                    <Button
                        className={`d-flex justify-content-center align-items-center rounded-3 mt-3 fw-bold`}
                        size={`${screen650 ? `small`: `medium`}`}
                        style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "90%", height: "10%", fontSize: screen750 ? "0.7rem" : "0.9rem" }}
                        disabled={
                            id === holdIdOfUserUntilSignedIn  /* for SignedIn user not consider */
                         || getUserfriendById === false       /* initially fetching data */
                         || processLoading                    /* while mutation onClick trigger for refetch */
                        }
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
                    >
                        <span style={{ visibility: (id === holdIdOfUserUntilSignedIn) ? "hidden" : "visible", overflow: "hidden", marginTop: 4.8 }}>
                        {
                            (
                                getUserfriendById === false  /* initially fetching data */
                             || processLoading               /* while mutation onClick trigger for refetch */
                            ) ? (
                                <CircularProgress size="1.655rem" style={{ color: dark ? "#d4d3d3" : "#000000"}}/>
                            ) : (
                                /* data have fetched for check particular user his friend or not */
                                <>
                                    <span>
                                    {
                                        getUserfriendById === null
                                        ? `Add ${!screen210 && `Friend`}`
                                        : `Remove ${!screen210 && `Friend`}`
                                    }
                                    </span>
                                    {
                                        getUserfriendById === null
                                        ? <PersonAddIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
                                        : <PersonAddDisabledIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
                                    }
                                </>
                            )
                        }
                        </span>
                    </Button>
                )
            }

            <div className="w-100 d-flex mt-5">
                <div style={{ flex: 0.94 }}/>
                <IconButton onClick={() => {
                    dispatch(changeDark());
                    darkAlert(dark);
                }}>
                    { dark ? <Brightness4Icon fontSize="small" style={{ color: dark ? "#000000" : "#d4d3d3"}}/>: <Brightness7Icon fontSize="small" style={{ color: dark ? "#000000" : "#d4d3d3"}}/> }
                </IconButton>
            </div>
        </div>
        </Zoom>
    )
}

export default Card;