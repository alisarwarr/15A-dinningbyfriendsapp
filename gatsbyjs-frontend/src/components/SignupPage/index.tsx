import React, { useState, useEffect } from 'react';
//MATERIAL-UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TelegramIcon from '@material-ui/icons/Telegram';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
//GATSBY
import { Link as Linked, navigate } from 'gatsby';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
import { selectIsLoading } from '../../toolkit/isLoadingSlice';
import { selectIsConfirmedSignup, changeIsConfirmedSignup } from '../../toolkit/isConfirmedSignupSlice';
import { selectHoldUsernameSignup, changeHoldUsernameSignup } from '../../toolkit/holdUsernameSignupSlice';
//FORMIK
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
//YUP
const yup = require('yup')
require('yup-password')(yup); //extend yup
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
import { signUp, confirmSignUp, resendConfirmationCode } from '../../amplify_functions';


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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))


function SignupPage() {
    //initailly run whenever visits page
    const firstRender = useFirstRender();
    useEffect(() => {
        if(firstRender) {
            toastAlert('Signup Form', 'top-start', 'success');
        }
    }, [firstRender]);
    //initailly run whenever visits page


    const classes = useStyles();

    const dark = useSelector(selectDark);
    const isLoading = useSelector(selectIsLoading);
    const isConfirmedSignup = useSelector(selectIsConfirmedSignup);
    const holdUsernameSignup = useSelector(selectHoldUsernameSignup);
    const dispatch = useDispatch();

    const [ visiblity1, setVisiblity1 ] = useState<boolean>(false);
    const [ visiblity2, setVisiblity2 ] = useState<boolean>(false);


    if(isLoading) {
        return <Loader/>;
    }

    return (
        <div className="signup">
            <Head title="SignUp"/>

            <Grid container component="main" className={classes.root} id={dark ? "bg2" : "bg1"}>
                <CssBaseline/>

                <Grid item xs={false} sm={6} md={7} id="image">
                    <Zoom>
                    <img
                       src={dark ? pic3 : pic4}
                    />
                    </Zoom>
                </Grid>

                <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square id={dark ? "bg1" : "bg2"}>
                    <Zoom>
                    <div className={classes.paper}>

                        {
                            !isConfirmedSignup ? (
                                <>
                                    <Avatar className={classes.avatar} style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}>
                                        <TelegramIcon style={{ color: dark ? "#000000" : "#d4d3d3"}}/>
                                    </Avatar>

                                    <Typography component="h1" variant="h5" style={{ color: dark ? "#d4d3d3" : "#000000"}} id="fontfam" className="fw-bold">
                                        Sign up
                                    </Typography>

                                    <Formik
                                        initialValues={{
                                            username: "",
                                            email: "",
                                            password: "",
                                            confirmpassword: ""
                                        }}
                                        validationSchema={
                                            yup.object({
                                                username: yup.string()
                                                .max(30, 'Must be atmost 30 character')
                                                .min(3, 'Must have atleast 3 characters')
                                                .required('Must fill username'),
                
                                                email: yup.string()
                                                .email('Must be a valid email')
                                                .max(30, 'Must be atmost 30 character')
                                                .min(5, 'Must be atleast 5 characters')
                                                .required('Must fill email'),
                
                                                password: yup.string().password()
                                                .minLowercase(1, 'Must be atleast 1 lowercase')
                                                .minUppercase(1, 'Must be atleast 1 uppercase')
                                                .minNumbers(1, 'Must be atleast 1 number')
                                                .minSymbols(0, 'Must not include any symnol')
                                                .min(6, 'Must be atleast than 6 characters')
                                                .required('Must fill password'),
                
                                                confirmpassword: yup.string()
                                                .required('Must fill password')
                                                .oneOf([yup.ref("password")], "Both password need to be the same"),
                                            })
                                        }
                                        onSubmit={async(values, { resetForm }) => {
                                            resetForm();

                                            //dispatching redux, storing 'username' for use later
                                            dispatch(changeHoldUsernameSignup(values.username));

                                            //applying for signup AWS-COGNITO
                                            signUp(
                                                {   /* send values */
                                                    username : values.username,
                                                    email    : values.email,
                                                    password : values.password
                                                },
                                            );

                                            //calling alert
                                            toastAlert('Registering..', 'top-end', 'info');
                                        }}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form className={classes.form} autoComplete="off" id={dark ? "form1" : "form2"}>
            
                                                <Box paddingBottom={1}>
                                                    <Field fullWidth name='username' component={TextField} label="Username"
                                                    />
                                                </Box>
                
                                                <Box paddingBottom={1}>
                                                    <Field fullWidth name='email' component={TextField} label="Email"
                                                    />
                                                </Box>
                
                                                <Box paddingBottom={1} display="flex" alignItems="center">
                                                    <Field fullWidth name='password' component={TextField} label="Password"
                                                           type={visiblity1 ? "text" : "password"}
                                                    />
                                                    { visiblity1 ? <VisibilityIcon fontSize="small" onClick={() => setVisiblity1(false)} style={{ color: dark ? "#d4d3d3" : "#000000"}}/> : <VisibilityOffIcon fontSize="small" onClick={() => setVisiblity1(true)} style={{ color: dark ? "#d4d3d3" : "#000000"}}/> }
                                                </Box>
                
                                                <Box paddingBottom={1} display="flex" alignItems="center">
                                                    <Field fullWidth name='confirmpassword' component={TextField} label="Confirm Password"
                                                           type={visiblity2 ? "text" : "password"}
                                                    />
                                                    { visiblity2 ? <VisibilityIcon fontSize="small" onClick={() => setVisiblity2(false)} style={{ color: dark ? "#d4d3d3" : "#000000"}}/> : <VisibilityOffIcon fontSize="small" onClick={() => setVisiblity2(true)} style={{ color: dark ? "#d4d3d3" : "#000000"}}/> }
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
                                                    Sign Up
                                                </Button>
                
                                                <Grid container>
                                                    <Grid item>
                                                        <Linked to='/signin' style={{ color: dark ? "#d4d3d3" : "#000000"}}>
                                                            Have an account? SignIn
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
                                </>
                            ) : (
                                <>
                                    <Avatar className={classes.avatar} style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}>
                                        <EmailIcon style={{ color: dark ? "#000000" : "#d4d3d3"}} fontSize="small"/>
                                    </Avatar>  
            
                                    <Typography component="h1" variant="h5" style={{ color: dark ? "#d4d3d3" : "#000000"}} id="fontfam" className="fw-bold">
                                        Confimration Code
                                    </Typography>

                                    <Formik
                                        initialValues={{
                                            confimrationcode: ""
                                        }}
                                        validationSchema={
                                            yup.object({
                                                confimrationcode: yup.string()
                                                .required('Must fill Confimration Code')
                                            })
                                        }
                                        onSubmit={async(values) => {
                                            //applying for confrim signup AWS-COGNITO
                                            confirmSignUp(
                                                {   /* send values */
                                                    username : holdUsernameSignup,
                                                    code     : values.confimrationcode
                                                }
                                            );

                                            //calling alert
                                            toastAlert('Submitting..', 'top-start', 'info');
                                        }}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form className={classes.form} autoComplete="off" id={dark ? "form1" : "form2"}>
            
                                                <Box paddingBottom={1}>
                                                    <Field fullWidth name='confimrationcode' component={TextField} label="Confimration Code"
                                                    />
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
                                                    Confirmation Code
                                                </Button>
                
                                                <Box paddingBottom={1} display="flex" alignItems="center" justifyContent="space-between">
                                                    <span>
                                                        <button
                                                            className="btn btn-link"
                                                            id="stylelikeanchor"
                                                            style={{ color: dark ? "#d4d3d3" : "#000000", marginLeft: "-0.7875rem" }}
                                                            onClick={() => {
                                                                toastAlert('Resending...', 'top-start', 'success');

                                                                //applying for resend AWS-COGNITO
                                                                resendConfirmationCode(
                                                                    {   /* send values */
                                                                        username : holdUsernameSignup
                                                                    }
                                                                );
                                                            }}
                                                        >
                                                            Resend code now!
                                                        </button>
                                                    </span>

                                                    <span>
                                                        <button
                                                            className="btn btn-link"
                                                            id="stylelikeanchor"
                                                            style={{ color: dark ? "#d4d3d3" : "#000000"}}
                                                            onClick={() => {
                                                                navigate('/signin');
                                                                //dispatching redux, for close confirmation form
                                                                dispatch(changeIsConfirmedSignup(false));
                                                            }}
                                                        >
                                                            Have an account? SignIn
                                                        </button>
                                                    </span>
                                                </Box>

                                                <Box mt={1}>
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
                                </>
                            )
                        }

                    </div>
                    </Zoom>
                </Grid>
            </Grid>
        </div>
    )
}

export default SignupPage;