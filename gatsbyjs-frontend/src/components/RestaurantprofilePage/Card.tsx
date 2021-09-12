import React, { useState, useEffect } from 'react';
//MATERIAL-UI
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import TelegramIcon from '@material-ui/icons/Telegram';
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
import { selectHoldNameOfUserUntilSignedIn } from '../../toolkit/holdNameOfUserUntilSignedInSlice';
//GATSBY
import { navigate } from 'gatsby';
//SWEETALERT2
import { darkAlert, errorAlert, toastAlert } from '../../alerts';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
/* in case of user is currently SignedIn in the application */
//APPSYNC-MUTATIONS
import { handleCreateUserrestaurant, handleDeleteUserrestaurant, handleCreateRestaurantuserreview, handleEditRestaurantuserreview } from '../../appsync_functions/mutations';
//APPSYNC-QUERIES
import { fetchGetUserrestaurantById, fetchGetRestaurantuserreviewByUserId } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUserrestaurant, subscribeOnRestaurantuserreview } from '../../appsync_functions/subscriptions';


type CardProps = {
    id: string;
    name: string;
    address: string;
    cuisine: string;
    /* receiving useState value & its Func  */
    input: string;
    setInput: Function;
    isEditing: boolean;
    setIsEditing: Function;
}

function Card({
    id,
    name,
    address,
    cuisine,
    /* receiving useState value & its Func  */
    input,
    setInput,
    isEditing,
    setIsEditing
}: CardProps) {
    const dark = useSelector(selectDark);
    const isUserSignedin = useSelector(selectIsUserSignedin);
    const holdIdOfUserUntilSignedIn = useSelector(selectHoldIdOfUserUntilSignedIn);
    const holdNameOfUserUntilSignedIn = useSelector(selectHoldNameOfUserUntilSignedIn);
    const dispatch = useDispatch();


    //for circularprogress loading whenever 'mutation' called onClick ( only update purpose )
    const [ processLoading, setProcessLoading ] = useState<any>(false);


/* in case of user is currently SignedIn in the application */
    const [ getUserrestaurantById, setGetUserrestaurantById ] = useState<any>(false);
    const [ getRestaurantuserreviewByUserId, setGetRestaurantuserreviewByUserId ] = useState<any>(false);
    //fetching data from APPSYNC
    useEffect(() => {
        if(isUserSignedin) {
            const fetchFunction1 = async() => {
                setGetUserrestaurantById(await fetchGetUserrestaurantById({
                    idFrom : holdIdOfUserUntilSignedIn,
                    idTo   : id
                }));


                /* disable circularprogress loading ( actual logic after first fetch whenever mutation onClick trigger for refetch ) */
                setProcessLoading(false);
            }
            //fetching for first time
            fetchFunction1();
            //'subscription' for first time
            subscribeOnUserrestaurant(fetchFunction1);


            const fetchFunction2 = async() => {
                setGetRestaurantuserreviewByUserId(await fetchGetRestaurantuserreviewByUserId({
                    idFrom : id,
                    idTo   : holdIdOfUserUntilSignedIn
                }));
            }
            //fetching for first time
            fetchFunction2();
            //'subscription' for first time
            subscribeOnRestaurantuserreview(fetchFunction2);
        }
    }, []);
    //fetching data from APPSYNC
/* in case of user is currently SignedIn in the application */
    

    const screen750 = useMediaQuery('(max-width:750px)');


//*******************************************************
    const handleSubmit = async(e: any) => {
        e.preventDefault();
    
        if(input === '') {
            errorAlert('Review', `You need to give Review!`);
        }
        else {
            if(/* if editing */
                isEditing
            ) {
                await handleEditRestaurantuserreview({
                    r_id : getRestaurantuserreviewByUserId?.r_id,
                    text : input
                })
        
                /* disable editing */                                                    
                setIsEditing(false);
            }
            else {
                await handleCreateRestaurantuserreview({
                    idFrom  : id,
                    idTo    : holdIdOfUserUntilSignedIn,
                    hisName : holdNameOfUserUntilSignedIn,
                    text    : input
                })
            }    

            //calling alert
            toastAlert('Uploading..', 'top-start', 'info');
        }
    }

    //incase of enter press in textarea
    const onEnterPress = async(e: any) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            await handleSubmit(e);
        }
    }
//*******************************************************


    return (
        <Zoom>
        <div
            className={`jumbotron rounded border border-light border-3 w-100`}
            style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}
        >
            <h1 className="display-4" style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                {name}
            </h1>

            <p style={{ color: dark ? "#000000" : "#d4d3d3" }}>
                {address} | {cuisine}
            </p>

            <Button
                className={`d-flex justify-content-center align-items-center rounded-3 mt-3 fw-bold`}
                size={`${screen750 ? `small`: `medium`}`}
                style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "90%", height: "10%", fontSize: screen750 ? "0.7rem" : "0.9rem"  }}
                onClick={() => {
                    navigate(`/restaurantcustomerslist/${id}`);
                }}
            >
                <span> Customers List </span>
                <PeopleAltIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
            </Button>

            {/* in case of user is currently SignedIn in the application */
                isUserSignedin && (
                    <>
                        <Button
                            className={`d-flex justify-content-center align-items-center rounded-3 mt-3 fw-bold`}
                            size={`${screen750 ? `small`: `medium`}`}
                            style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", width: "90%", height: "10%", fontSize: screen750 ? "0.7rem" : "0.9rem" }}
                            disabled={
                                getUserrestaurantById === false      /* initially fetching data */
                             || processLoading                       /* while mutation onClick trigger for refetch */
                            }
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
                                            ? `Add Restaurant`
                                            : `Remove Restaurant`
                                        }
                                        </span>
                                        {
                                            getUserrestaurantById === null
                                            ? <AddCircleIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
                                            : <RemoveCircleIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
                                        }
                                    </>
                                )
                            }
                        </Button>

                        <div
                            className="container mt-4 formbox"
                            style={{ visibility: getRestaurantuserreviewByUserId === false ? `hidden` : `visible`, overflowY: "hidden" }}
                        >
                            <div className="card-body rounded rounded-4" style={{ backgroundColor: dark ? "#000000" : "#d4d3d3" }}>
                                <form className="form-group" id="myform" onSubmit={handleSubmit}>
                                    <textarea
                                        className="form-control" rows={3}
                                        placeholder="Enter a review . . ." autoFocus
                                        onChange={(e) => setInput(e.target.value)}
                                        value={input}
                                        disabled={
                                            /* if already reviewed so & apply for edit then not disable */
                                            (getRestaurantuserreviewByUserId !== null && isEditing) && false
                                            /* if already reviewed so & not apply for edit then disable */
                                         || (getRestaurantuserreviewByUserId !== null && !isEditing) && true
                                            /* if not already reviewed so then not disable */
                                         || !(getRestaurantuserreviewByUserId === null) && false
                                        }
                                        //incase of enter press in textarea
                                        onKeyDown={onEnterPress}
                                    />

                                    <div className="d-flex justify-content-end pt-3">
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}
                                            disabled={
                                                /* if already reviewed so & apply for edit then not disable */
                                                !(getRestaurantuserreviewByUserId !== null && isEditing) && false
                                                /* if already reviewed so & not apply for edit then disable */
                                             || (getRestaurantuserreviewByUserId !== null && !isEditing) && true
                                                /* if not already reviewed so then not disable */
                                             || !(getRestaurantuserreviewByUserId === null) && false
                                            }
                                            type="submit"
                                            //incase submit button not directly in form
                                            form="myform"
                                        >
                                            <TelegramIcon fontSize="small" style={{ color: dark ? "#000000" : "#d4d3d3", marginLeft: "0.125rem", marginTop: "-0.295rem" }}/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }

            <div className="w-100 d-flex mt-1">
                <div style={{ flex: 0.955 }}/>
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