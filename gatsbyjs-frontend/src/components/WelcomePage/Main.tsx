import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
//MATERIAL-UI
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectHoldNameOfUserUntilSignedIn } from '../../toolkit/holdNameOfUserUntilSignedInSlice';
//ARRAY-SHUFFLE
import shuffleArray from '../shuffleArray';
//STYLISH-LOADING
import Loading from '../_stylishLoading/Loading';
//APPSYNC-QUERIES
import { fetchAllUserfriends, fetchAllUserrestaurants } from '../../appsync_functions/queries';
//APPSYNC-SUBSCRIPTIONS
import { subscribeOnUserfriend, subscribeOnUserrestaurant } from '../../appsync_functions/subscriptions';


type MainProps = {
    id: string;
    name: string;
}

function Main({
    id,
    name
}: MainProps) {
    const dark = useSelector(selectDark);
    const holdNameOfUserUntilSignedIn = useSelector(selectHoldNameOfUserUntilSignedIn);



    //fetching data from APPSYNC
    const [ allUserfriends, setAllUserfriends ] = useState<any>(false);
    const [ allUserrestaurants, setAllUserrestaurants ] = useState<any>(false);
    useEffect(() => {
        const fetchFunction1 = async() => {
            setAllUserfriends(await fetchAllUserfriends(id));
        }
        //fetching for first time
        fetchFunction1();
        //'subscription' for first time
        subscribeOnUserfriend(fetchFunction1);


        const fetchFunction2 = async() => {
            setAllUserrestaurants(await fetchAllUserrestaurants(id));
        }
        //fetching for first time
        fetchFunction2();
        //'subscription' for first time
        subscribeOnUserrestaurant(fetchFunction2);
    }, []);
    //fetching data from APPSYNC



    //fetching data from APPSYNC
    const [ allMutualfriends, setAllMutualfriends ] = useState<any>([]);
    const [ allMutualrestaurants, setAllMutualrestaurants ] = useState<any>([]);
    useEffect(() => {
        if(allUserfriends !== false) {                       /* initailly for not trigger 'useEffect' */
            if(
                allUserfriends === null                      /* if cannot get data for some reason */
             || allUserfriends.length === 0                  /* if no friend then no suggestions */
            ) {
                setAllMutualfriends(null);
                setAllMutualrestaurants(null);
            }



            else {
                //****************************************************************************/
                for(var {id: _id, name: _name} of allUserfriends) {
                    const fetchFunction3 = async() => {
                        const data = await fetchAllUserfriends(_id);
    
                        const newData = data.map(obj => {
                            //for get unique objects in array of objects ( for because one user is friend of multiple users so storing as a friend of one  user rejecting others mutual )
                            const index = allMutualfriends.findIndex((item) => item.name === obj.name);
    
                            //findIndex will return -1 for items which don't already exist in the array
                            if(index === -1) {
                                return {
                                    ...obj,
                                    hisFriend: _name         /* add new property to each array */
                                }    
                            }
                            else if(index !== -1) {
                                return null;
                            }
                        }).filter(x => x !== null);          /* replace as blank in place of null */
    
                        setAllMutualfriends(prev => [ ...prev, ...newData ]);
                    }
                    //fetching for first time
                    fetchFunction3();
                    //'subscription' for first time
                    subscribeOnUserfriend(fetchFunction3);
    
    
    
                    const fetchFunction4 = async() => {
                        const data = await fetchAllUserrestaurants(_id);
    
                        const newData = data.map(obj => {
                            //for get unique objects in array of objects ( for because one restaurant is restaurant of multiple users so storing as a restaurant of one user rejecting mutual )
                            const index = allMutualrestaurants.findIndex((item) => item.name === obj.name);
    
                            //findIndex will return -1 for items which don't already exist in the array
                            if(index === -1) {
                                return {
                                    ...obj,
                                    hisRestaurant: _name     /* add new property to each array */
                                }    
                            }
                            else if(index !== -1) {
                                return null;
                            }
                        }).filter(x => x !== null);          /* replace as blank in place of null */
    
                        setAllMutualrestaurants(prev => [ ...prev, ...newData ]);
                    }
                    //fetching for first time
                    fetchFunction4();
                    //'subscription' for first time
                    subscribeOnUserrestaurant(fetchFunction4);
                }
                //***************************************************************************/


                //shuffling arrays
                setAllMutualfriends(prev => shuffleArray(prev));
                setAllMutualrestaurants(prev => shuffleArray(prev));
            }
        }
    }, [allUserfriends, allUserrestaurants]);
    //fetching data from APPSYNC



    let flag1 = true;        /* just for heading show only if render atleast one item  */
    let flag2 = true;        /* just for heading show only if render atleast one item  */



    return (
        <div
            style={{
                //makes footer sticky at bottom
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                //makes footer sticky at bottom
                //+ ( marginTop: "auto" style in footer tag )
            }}
        >
            <CssBaseline/>

            <Container maxWidth="lg">
                <Header/>

                <MainFeaturedPost
                    title={`Welcome, ${name}`}
                    description="Now you can easily register your own restaurant in our application only if you are our current user."
                    image="https://source.unsplash.com/1400x400/?restaurant"
                    linkText="Register Restaurant!"
                />
                
                {
                    (
                        allMutualfriends?.length === 0 && allMutualrestaurants?.length === 0
                    )
                    && (
                        <div className="d-flex justify-content-center w-100 p-2 pb-4">
                            <Loading
                                sentence="Loading"
                            />
                        </div>
                    )
                }

                <main style={{ display: `${allMutualfriends === null ? `none` : `block`}`, overflow: "hidden" }} className="pt-2 pb-5">
                    {
                        allMutualfriends?.length !== 0 && (
                            <Grid container spacing={4}>
                                {
                                    allMutualfriends?.map(({
                                        id,
                                        name,
                                        hisFriend
                                    }) => {
                                        if(
                                            /* removing SignedIn user as a friend from other because SignedIn user's friends they are & we don't want show him to himself as a suggestions of his mutual friends */
                                               name === holdNameOfUserUntilSignedIn
                                            /* removing restaurants of SignedIn user because we don't want to show them as a suggestions of his mutual restaurants */
                                          ||   allUserrestaurants.some(({name: _name}) => _name === name)
                                            /* removing friends of SignedIn user because we don't want to show them as a suggestions of his mutual friends */
                                          ||   allUserfriends.some(({name: _name}) => _name === name)
                                        ) {
                                            return null;
                                        }

                                        else {
                                            if(flag1) {       /* just for heading show only if render atleast one item  */
                                                flag1 = false;
                                                return (
                                                    <>
                                                        <Typography gutterBottom id="fontfam" className="d-flex justify-content-center w-100 mt-2 heading" style={{ marginTop: "-0.5rem", letterSpacing: 0.95, wordSpacing: 1.15 }}>
                                                            <span className={`badge bg-${dark ? `light` : `dark`} text-${dark ? `dark` : `light`} fw-bold`}>Mutual Friends</span>
                                                        </Typography>
    
                                                        <FeaturedPost
                                                            key={id}
                                                            id={id}
                                                            name={name}
                                                            hisFriend={hisFriend}
                                                            type='friend'
                                                        />
                                                    </>
                                                )
                                            }

                                            return (
                                                <FeaturedPost
                                                    key={id}
                                                    id={id}
                                                    name={name}
                                                    hisFriend={hisFriend}
                                                    type='friend'
                                                />
                                            )
                                        }
                                    })
                                }
                            </Grid>
                        )
                    }
                </main>

                <main style={{ display: `${allMutualrestaurants === null ? `none` : `block`}`, overflow: "hidden" }} className="pt-2 pb-5">
                    {
                        allMutualrestaurants?.length !== 0 && (
                            <Grid container spacing={4}>
                                {
                                    allMutualrestaurants?.map(({
                                        id,
                                        name,
                                        hisRestaurant
                                    }) => {
                                        if(
                                            /* removing restaurants of SignedIn user because we don't want to show them as a suggestions of his mutual restaurants */
                                            allUserrestaurants.some(({name: _name}) => _name === name)
                                        ) {
                                            return null;
                                        }

                                        else {
                                            if(flag2) {       /* just for heading show only if render atleast one item  */
                                                flag2 = false;

                                                return (
                                                    <>
                                                        <Typography gutterBottom id="fontfam" className="d-flex justify-content-center w-100 mt-2 heading" style={{ marginTop: "-0.5rem", letterSpacing: 0.95, wordSpacing: 1.15 }}>
                                                            <span className={`badge bg-${dark ? `light` : `dark`} text-${dark ? `dark` : `light`} fw-bold`}>Mutual Restaurants</span>
                                                        </Typography>

                                                        <FeaturedPost
                                                            key={id}
                                                            id={id}
                                                            name={name}
                                                            hisRestaurant={hisRestaurant}
                                                            /* sending type */
                                                            type='restraurant'
                                                        />
                                                    </>
                                                )
                                            }
                                            return (
                                                <FeaturedPost
                                                    key={id}
                                                    id={id}
                                                    name={name}
                                                    hisRestaurant={hisRestaurant}
                                                    /* sending type */
                                                    type='restraurant'
                                                />
                                            )
                                        }
                                    })
                                }
                            </Grid>
                        )
                    }
                </main>
            </Container>

            <Footer title="Dining" description="You're using 'Dining By Friends Application'"/>
        </div>
    )
}

export default Main;