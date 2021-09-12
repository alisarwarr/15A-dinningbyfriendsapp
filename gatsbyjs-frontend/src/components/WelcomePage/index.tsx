import React, { useState, useEffect } from 'react';
import Main from './Main';
//REACT-HELMET
import Head from '../Head';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { changeHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
import { selectHoldNameOfUserUntilSignedIn } from '../../toolkit/holdNameOfUserUntilSignedInSlice';
//LOADER
import Loader from '../_animatedLoader/Loader';
//PAGE404
import Page404 from '../_animatedPage404/Page404';
//REACH-ROUTER
import { useParams } from '@reach/router';
//MATERIAL-UI
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
//APPSYNC-QUERIES
import { fetchGetUserByName } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUser } from '../../appsync_functions/subscriptions';


function WelcomePage() {
    const dark = useSelector(selectDark);
    const holdNameOfUserUntilSignedIn = useSelector(selectHoldNameOfUserUntilSignedIn);
    const dispatch = useDispatch();
    const params = useParams();  /*REACH-ROUTER hooks*/


    //fetching data from APPSYNC
    const [ getUserByName, setGetUserByName ] = useState<any>(false);
    useEffect(() => {
        if(
            //if anyone hits directly on url so its the same user who SignedIn
            params.name === holdNameOfUserUntilSignedIn
        ) {
            const fetchFunction = async() => {
                setGetUserByName(await fetchGetUserByName(params.name));
            }
    
            //fetching for first time
            fetchFunction();
    
            //'subscription' for first time
            subscribeOnUser(fetchFunction);    
        }
    }, []);
    //fetching data from APPSYNC


//**************************************************************************
    /* else anyone hits directly on url so its not the same user who SignedIn */
    if(
        params.name !== holdNameOfUserUntilSignedIn
    ) {
        return <Page404/>;
    }
//**************************************************************************


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


    //dispatching redux, storing `user's id` for use later
    dispatch(changeHoldIdOfUserUntilSignedIn(id));


    const muiTheme = createTheme({
        palette: {
            type: dark ? "dark" : "light"
        }
    });


    return (
        <>
            <Head title="Welcome"/>

            {/*component created only for theme purpose at 'welcome' page otherwise own styled*/}
            <ThemeProvider theme={muiTheme}> <Main id={id} name={name}/> </ThemeProvider>
        </>
    )    
}

export default WelcomePage;