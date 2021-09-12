import React, { useState, useEffect } from 'react';
//MATERIAL-UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
//GATSBY
import { Link as Linked } from 'gatsby';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
import { selectIsLoading } from '../../toolkit/isLoadingSlice';
//FORMIK
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
//YUP
const yup = require('yup');
//REACT-HELMET
import Head from '../Head';
//SWEETALERT2
import { darkAlert, toastAlert } from '../../alerts';
//FIRST-RENDER
import useFirstRender from '../useFirstRender';
//IMAGE
import { pic3, pic4 } from '../../images';
//LOADER
import Loader from '../_animatedLoader/Loader';
//PAGE404
import Page404 from '../_animatedPage404/Page404';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
//AMPLIFY_FUNCTION
import { signIn } from '../../amplify_functions';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))


function SigninPage() {
    //initailly run whenever visits page
    const firstRender = useFirstRender();
    useEffect(() => {
        if(firstRender) {
            toastAlert('Signin Form', 'top-end', 'success');
        }
    }, [firstRender]);
    //initailly run whenever visits page


    const classes = useStyles();

    const dark = useSelector(selectDark);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    const [ visiblity, setVisiblity ] = useState<boolean>(false);


    if(isLoading) {
        return <Loader/>;
    }

    return (
        <div className="signin">
            <Head title="SignIn"/>

            <Grid container component="main" className={classes.root} id={dark ? "bg2" : "bg1"}>
                <CssBaseline/>

                <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square id={dark ? "bg1" : "bg2"}>
                    <Zoom>
                    <div className={classes.paper}>

                        <Avatar className={classes.avatar} style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}>
                            <VpnKeyIcon style={{ color: dark ? "#000000" : "#d4d3d3"}}/>
                        </Avatar>

                        <Typography component="h1" variant="h5" style={{ color: dark ? "#d4d3d3" : "#000000"}} id="fontfam" className="fw-bold">
                            Sign in
                        </Typography>

                        <Formik
                            initialValues={{
                                username: "",
                                password: ""
                            }}
                            validationSchema={
                                yup.object({
                                    username : yup.string()
                                    .required('Must fill username'),
    
                                    password: yup.string()
                                    .required('Must fill password')
                                })
                            }
                            onSubmit={async(values) => {
                                //applying for signin AWS-COGNITO
                                signIn(
                                    {   /* send values */
                                        username : values.username,
                                        password : values.password
                                    }
                                );

                                //calling alert
                                toastAlert('Submitting..', 'top-end', 'info');
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className={classes.form} autoComplete="off" id={dark ? "form1" : "form2"}>
                                    
                                    <Box paddingBottom={1}>
                                        <Field fullWidth name='username' component={TextField} label="Username"
                                        />
                                    </Box>
    
                                    <Box paddingBottom={1} display="flex" alignItems="center">
                                        <Field fullWidth name='password' component={TextField} label="Password"
                                            type={visiblity ? "text" : "password"}
                                        />
                                        { visiblity ? <VisibilityIcon fontSize="small" onClick={() => setVisiblity(false)} style={{ color: dark ? "#d4d3d3" : "#000000"}}/> : <VisibilityOffIcon fontSize="small" onClick={() => setVisiblity(true)} style={{ color: dark ? "#d4d3d3" : "#000000"}}/> }
                                    </Box>
    
                                    <Button 
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        className={classes.submit}
                                        disabled={isSubmitting}
                                        startIcon={isSubmitting ? <CircularProgress size="1rem" style={{ color: dark ? "#d4d3d3" : "#000000"}}/> : null}
                                        style={{ color: dark ? "#000000" : "#d4d3d3", backgroundColor: dark ? "#d4d3d3" : "#000000" }}
                                    >
                                        Sign In
                                    </Button>
                                    
                                    <Grid container>
                                        <Grid item>
                                            <Linked to='/signup' style={{ color: dark ? "#d4d3d3" : "#000000"}}>
                                                Don't have an account? SignUp
                                            </Linked>
                                        </Grid>
                                    </Grid>
    
                                    <Box mt={4}>
                                       <Typography variant="body2" color="textSecondary" align="center" style={{ color: dark ? "#d4d3d3" : "#000000"}}>
                                            {'Copyright © '}
                                            <Link color="inherit" href="https://www.kfcpakistan.com/">
                                                kfcpakistan
                                            </Link>{' '}
                                            {new Date().getFullYear()}
                                            {'.'}
    
                                            <IconButton onClick={() => {
                                                dispatch(changeDark());
                                                darkAlert(dark);
                                            }}>
                                                { dark ? <Brightness4Icon fontSize="small" style={{ color: dark ? "#d4d3d3" : "#000000"}}/>: <Brightness7Icon fontSize="small" style={{ color: dark ? "#d4d3d3" : "#000000"}}/> }
                                            </IconButton>
                                       </Typography>
                                    </Box>
    
                                </Form>
                            )}
                        </Formik>

                    </div>
                    </Zoom>
                </Grid>

                <Grid item xs={false} sm={6} md={7} id="image">
                    <Zoom>
                    <img
                       src={dark ? pic4 : pic3}
                    />
                    </Zoom>
                </Grid>
            </Grid>
        </div>
    )
}

export default SigninPage;