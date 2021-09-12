import React from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectIsUserSignedin } from '../../toolkit/isUserSignedinSlice';
import { selectHoldNameOfUserUntilSignedIn } from '../../toolkit/holdNameOfUserUntilSignedInSlice';
//MATERIAL-UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//GATSBY
import { navigate } from 'gatsby';
//REACH-ROUTER
import { useLocation } from '@reach/router';


function Header() {
    const dark = useSelector(selectDark);
    const isUserSignedin = useSelector(selectIsUserSignedin);
    const holdNameOfUserUntilSignedIn = useSelector(selectHoldNameOfUserUntilSignedIn);
    const location = useLocation();  /*REACH-ROUTER hooks*/


    const screen510 = useMediaQuery('(max-width:510px)');
    const screen630 = useMediaQuery('(max-width:630px)');
    const screen700 = useMediaQuery('(max-width:700px)');


    return (
        <AppBar
            elevation={0}
            className="header"
            id={dark ? (screen510 ? "lightRespectAll" : "darkRespectAll") : (screen510 ? "darkRespectAll" : "lightRespectAll")}
        >
            <Toolbar className="toolbar">
                <Typography
                    className="toolbar_heading"
                    onClick={() => location.pathname === '/' ? null : navigate('/')}
                    id={dark ? "lightRespectText" : "darkRespectText"}
                >
                    Dining {screen630 ? `App` : `Application`} 
                </Typography>

                <div>
                    {
                        ( // dislpay on homepage if & only if user not signedin
                            location.pathname === '/' && !isUserSignedin
                        ) && (
                            <>
                                <Button
                                    disableRipple
                                    onClick={() => navigate('/signin')}
                                    size={screen700 ? "small" : "medium"}
                                    id="signinBtn"
                                >
                                    <span style={{ marginLeft: "0.185rem" }}>SIGNIN</span>
                                </Button>
    
                                <Button
                                    disableRipple
                                    onClick={() => navigate('/signup')}
                                    size={screen700 ? "small" : "medium"}
                                    id="signupBtn"
                                >
                                    <span style={{ marginLeft: "0.185rem" }}>SIGNUP</span>
                                </Button>
                            </>
                        )
                    }

                    {
                        ( // dislpay on homepage if & only if user signedin
                            location.pathname === '/' && isUserSignedin
                        ) && (
                            <Button
                                disableRipple
                                onClick={() => navigate(`/welcome/${holdNameOfUserUntilSignedIn}`)}
                                size={screen700 ? "small" : "medium"}
                                id="welcomeBtn"
                            >
                                <span style={{ marginLeft: "0.185rem" }}>WELCOME</span>
                            </Button>
                        )
                    }

                    {   
                        (
                            location.pathname === '/'
                        )
                        && (
                            <Button
                                disableRipple
                                onClick={() => navigate('/userslist')}
                                size={screen700 ? "small" : "medium"}
                                id="usersBtn"
                            >
                                <span style={{ marginLeft: "0.185rem" }}>USERS</span>
                            </Button>
                        )
                    }

                    {
                        (
                            location.pathname === '/'
                        )
                        && (
                            <Button
                                disableRipple
                                onClick={() => navigate('/restaurantslist')}
                                size={screen700 ? "small" : "medium"}
                                id="restaurantsBtn"
                            >
                                <span style={{ marginLeft: "0.185rem" }}>RESTAURANTS</span>
                            </Button>
                        )
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;