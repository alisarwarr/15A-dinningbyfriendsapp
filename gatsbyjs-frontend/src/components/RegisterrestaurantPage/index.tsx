import React, { useEffect } from 'react';
//MATERIAL-UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
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
//LOADER
import Loader from '../_animatedLoader/Loader';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
//APPSYNC-MUTATIONS
import { handleCreateRestaurant } from '../../appsync_functions/mutations';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));


function RegisterrestaurantPage() {
    //initailly run whenever visits page
    const firstRender = useFirstRender();
    useEffect(() => {
        if(firstRender) {
            toastAlert('Registeration Form', 'top-end', 'success', '17.875rem');
        }
    }, [firstRender]);
    //initailly run whenever visits page


    const classes = useStyles();
  
    const dark = useSelector(selectDark);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();


    if(isLoading) {
        return <Loader/>;
    }

    return (
        <>
            <Head title="Register Restaurant"/>

            <div className="registerrestaurantpage" id={dark ? "bg2" : "bg1"}>
                <Container component="main" maxWidth="xs" id={dark ? "bg1" : "bg2"} className="rounded-2"
                           style={{ paddingLeft: "2.265rem", paddingRight: "2.265rem", paddingBottom: "3.815rem" }}
                >
                    <CssBaseline/>

                    <Zoom>
                    <div className={classes.paper}>
    
                        <Avatar className={classes.avatar} style={{ backgroundColor: dark ? "#d4d3d3" : "#000000" }}>
                            <RestaurantMenuIcon style={{ color: dark ? "#000000" : "#d4d3d3"}}/>
                        </Avatar>
        
                        <Typography component="h1" variant="h5" style={{ color: dark ? "#d4d3d3" : "#000000" }}
                                    className="fw-bold d-flex justify-content-center align-items-center flex-column" id="fontfam"
                        >
                            <p className="overflow-hidden">Registeration Form</p>
                            <p className="overflow-hidden">( Restaurant )</p>
                        </Typography>
        
                        <Formik
                            initialValues={{
                                name: "",
                                cuisine: "",
                                address: ""
                            }}
                            validationSchema={
                                yup.object({
                                    name: yup.string()
                                    .max(20, 'Must be atmost 20 character')
                                    .min(3, 'Must have atleast 3 characters')
                                    .required('Must fill name'),
        
                                    cuisine: yup.string()
                                    .max(15, 'Must be atmost 15 character')
                                    .min(3, 'Must be atleast 3 characters')
                                    .required('Must fill cuisine'),

                                    address: yup.string()
                                    .max(50, 'Must be atmost 50 character')
                                    .min(10, 'Must be atleast 10 characters')
                                    .required('Must fill address')
                                })
                            }
                            onSubmit={async(values) => {
                                //pushing to DB by AppSync
                                handleCreateRestaurant(
                                    {   /* send values */
                                        name    : values.name,
                                        cuisine : values.cuisine,
                                        address : values.address
                                    }
                                );
                                
                                //calling alert
                                toastAlert('Registering..', 'top-end', 'info');
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className={classes.form} autoComplete="off" id={dark ? "form1" : "form2"}>
    
                                    <Box paddingBottom={1}>
                                        <Field fullWidth name='name' component={TextField} label="Name"
                                        />
                                    </Box>
        
                                    <Box paddingBottom={1}>
                                        <Field fullWidth name='cuisine' component={TextField} label="Cuisine"
                                        />
                                    </Box>

                                    <Box paddingBottom={1}>
                                        <Field fullWidth name='address' component={TextField} label="Address"
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
                                        Register
                                    </Button>
        
                                    <Grid container>
                                        <Grid item>
                                            <Linked to='/restaurantslist' style={{ color: dark ? "#d4d3d3" : "#000000"}}>
                                                Have an restaurant? Check List
                                            </Linked>
                                        </Grid>
                                    </Grid>
    
                                    <Box mt={8}>
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
                </Container>
            </div>
        </>
    )
}

export default RegisterrestaurantPage;