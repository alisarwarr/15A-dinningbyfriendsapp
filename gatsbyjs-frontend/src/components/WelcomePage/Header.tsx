import React from 'react';
import classnames from 'classnames';
import sections from './sections';
//MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//GATSBY
import { Link, navigate } from 'gatsby';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
//SWEETALERT2
import { userProfileInputAlert, restaurantProfileInputAlert, darkAlert } from '../../alerts';
//AMPLIFY_FUNCTION
import { signOut } from '../../amplify_functions';


const useStyles = makeStyles((theme) => ({
    toolbar: {
       borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbarTitle: {
       flex: 1
    },
    toolbarSecondary: {
       justifyContent: 'space-between',
       overflowX: 'auto'
    },
    toolbarLink: {
       padding: theme.spacing(1),
       flexShrink: 0
    },
    //own made style like anchor
    btnLookLikeLink: {
        padding: 8,
        flexShrink: 0,
        lineHeight: 1.43,
        fontWeight: 400,
        color: "#0d6efd",
        letterSpacing: "0.01071em",
        border: "none",
        outline: "none",
        background: "none"
    }
}));


function Header() {
    const classes = useStyles();
    const screen630 = useMediaQuery('(max-width:630px)');

    const dark = useSelector(selectDark);
    const dispatch = useDispatch();

    return (
        <>
            <Toolbar className={classes.toolbar}>
                <Typography
                    id="fontfam"
                    style={{ cursor: "pointer", fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "0.415px", wordSpacing: "0.175rem" }}
                    onClick={() => window.location.pathname === '/' ? null : navigate('/')}
                >
                    Dining {screen630 ? `App` : `Application`} 
                </Typography>
                
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    {sections.title}
                </Typography>

                <IconButton onClick={() => {
                    dispatch(changeDark());
                    darkAlert(dark);
                }}>
                    { dark ? <Brightness4Icon fontSize="small" style={{ color: dark ? "#d4d3d3" : "#000000"}}/>: <Brightness7Icon fontSize="small" style={{ color: dark ? "#d4d3d3" : "#000000"}}/>}
                </IconButton>

                <Button variant="outlined" size="small" onClick={() => signOut()}>
                    Sign Out
                </Button>
            </Toolbar>

            <Toolbar className={classes.toolbarSecondary} component="nav" variant="dense">
                {
                    sections.map((section, i) => {
                        if(
                            section.url === '/userprofile' ||
                            section.url === '/restaurantprofile'
                        ) {
                            /* as button inplace of a, for call alert using onclick event */
                            return (
                                <button
                                    key={i}
                                    className={classnames("btn-link", classes.btnLookLikeLink)}
                                    id="stylelikeanchor"
                                    onClick={() => {
                                        if(section.url === '/userprofile') {
                                            userProfileInputAlert();
                                        }
                                        else if(section.url === '/restaurantprofile') {
                                            restaurantProfileInputAlert();
                                        }
                                    }}
                                >
                                    {section.title}
                                </button>
                            )
                        }

                        return (
                            <Link
                                key={i}
                                to={section.url}
                                className={classes.toolbarLink}
                            >
                                {section.title}
                            </Link>
                        )
                    })
                }
            </Toolbar>
        </>
    )
}

export default Header;