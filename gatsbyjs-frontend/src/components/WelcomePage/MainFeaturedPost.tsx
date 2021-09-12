import React from 'react';
//MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
//GATSBY
import { navigate } from 'gatsby';


const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0
        }
    },
}));


type MainFeaturedPostProps = {
    title: string;
    description: string;
    image: string;
    linkText: string;
}

function MainFeaturedPost({
    title,
    description,
    image,
    linkText,
}: MainFeaturedPostProps) {
    const classes = useStyles();
  
    return (
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${image})` }}>
            {<img style={{ display: 'none' }} src={image}/>}

            <div className={classes.overlay}/>

            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom id="fontfam">
                            {title}
                        </Typography>
                        
                        <Typography variant="h5" color="inherit" paragraph className="mb-5" id="fontfam" >
                            {description}
                        </Typography>
                        
                        <Link variant="subtitle1" onClick={() => navigate('/registerrestaurant')}
                              className="bg-light fw-bold p-3 rounded-2 lh-lg"
                        >
                            {linkText}
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default MainFeaturedPost;