import React from 'react';
//MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectHoldIdOfUserUntilSignedIn } from '../../toolkit/holdIdOfUserUntilSignedInSlice';
//GATSBY
import { navigate } from 'gatsby';
//IMAGE
import { pic5, pic6 } from '../../images';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
//APPSYNC-MUTATIONS
import { handleCreateUserfriend, handleCreateUserrestaurant } from '../../appsync_functions/mutations';


const useStyles = makeStyles({
    card: {
       display: 'flex'
    },
    cardDetails: {
       flex: 1
    },
    cardMedia: {
       width: 160,
       height: 230
    }
});


type FeaturedPostProps = {
    id: string;
    name: string;
    hisFriend?: string;
    hisRestaurant?: string;
    /* for two different categories */
    type: string;
}

function FeaturedPost({
    id,
    name,
    hisFriend,
    hisRestaurant,
    /* for two different categories */
    type
}: FeaturedPostProps) {
    const dark = useSelector(selectDark);
    const holdIdOfUserUntilSignedIn = useSelector(selectHoldIdOfUserUntilSignedIn);


    const classes = useStyles();
    const screen210 = useMediaQuery('(max-width:210px)');


    return (
        <Grid item xs={12} md={6}>
            <Zoom>
            <Card
                className={classes.card}
                style={{ color: dark ? "#000000" : "#d4d3d3", backgroundColor: dark ? "#d4d3d3" : "#000000" }}
            >
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h5" id="fontfam" style={{ width: "100% ", textAlign: "right", fontWeight: "bold", paddingBottom: 12 }}>
                            {name}
                        </Typography>

                        {
                            type === 'friend' && (
                                <>
                                    <Typography id="fontfam" style={{ width: "100% ", textAlign: "left", fontWeight: "bold", paddingBottom: 12, letterSpacing: "0.125rem", wordSpacing: "0.225rem" }}>
                                        {hisFriend} ( Mutual Friend )
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", marginTop: "0.25rem", padding: "0.75rem", textAlign: "center", width: "100%", fontWeight: "bold" }}
                                        id="fontfam"
                                        onClick={() => {
                                            navigate(`/userprofile/${name}`);
                                        }}
                                    >
                                        <span> {!screen210 && ` Profile`} View </span>
                                        <VisibilityIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", marginTop: "0.25rem", padding: "0.75rem", textAlign: "center", width: "100%", fontWeight: "bold" }}
                                        id="fontfam"
                                        className="mt-2"
                                        onClick={async() => {
                                            await handleCreateUserfriend({
                                                idFrom : holdIdOfUserUntilSignedIn,
                                                idTo   : id
                                            })
                                        }}
                                    >
                                        <span> {`Add ${!screen210 && `Friend`}`} </span>
                                        <PersonAddDisabledIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>                      
                                    </Button>
                                </>
                            )
                        }

                        {
                            type === 'restraurant' && (
                                <>
                                    <Typography id="fontfam" style={{ width: "100% ", textAlign: "left", fontWeight: "bold", paddingBottom: 12, letterSpacing: "0.125rem", wordSpacing: "0.225rem" }}>
                                        {hisRestaurant} ( Mutual Restaurant )
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", marginTop: "0.25rem", padding: "0.75rem", textAlign: "center", width: "100%", fontWeight: "bold" }}
                                        id="fontfam"
                                        onClick={() => {
                                            navigate(`/restaurantprofile/${name}`);
                                        }}
                                    >
                                        <span> {!screen210 && ` Profile`} View </span>
                                        <VisibilityIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>
                                    </Button>

                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ color: dark ? "#d4d3d3" : "#000000", backgroundColor: dark ? "#000000" : "#d4d3d3", marginTop: "0.25rem", padding: "0.75rem", textAlign: "center", width: "100%", fontWeight: "bold" }}
                                        id="fontfam"
                                        className="mt-2"
                                        onClick={async() => {
                                            await handleCreateUserrestaurant({
                                                idFrom : holdIdOfUserUntilSignedIn,
                                                idTo   : id
                                            })
                                        }}
                                    >
                                        <span> {`Add ${!screen210 && `Restaurant`}`} </span>
                                        <PersonAddDisabledIcon fontSize="small" style={{ marginLeft: "0.945rem", marginTop: "0.035rem" }}/>                      
                                    </Button>
                                </>
                            )
                        }
                    </CardContent>
                </div>

                <Hidden xsDown>
                   <CardMedia className={classes.cardMedia} image={(type === 'friend' && pic5) || (type === 'restraurant' && pic6)} title={name}/>
                </Hidden>
            </Card>
            </Zoom>
        </Grid>
    )
}

export default FeaturedPost;