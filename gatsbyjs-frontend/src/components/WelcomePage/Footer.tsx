import React from 'react';
//MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';


const useStyles = makeStyles((theme) => ({
    footer: {
       backgroundColor: theme.palette.background.paper,
       padding: theme.spacing(6, 0)
    }
}));


type FooterProps = {
    description: string;
    title: string;
}

function Footer({
    description,
    title
}: FooterProps) {
    const classes = useStyles();

    const dark = useSelector(selectDark);
    const dispatch = useDispatch();

    return (
        <footer className={classes.footer} style={{ marginTop: "auto" }}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>

                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {description}
                </Typography>
                
                <Typography variant="body2" color="textSecondary" align="center" style={{ color: dark ? "#d4d3d3" : "#000000"}}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://www.kfcpakistan.com/">
                        kfcpakistan
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
    
                    <IconButton onClick={() => {
                        dispatch(changeDark());
                    }}>
                        { dark ? <Brightness4Icon fontSize="small"/>: <Brightness7Icon fontSize="small"/> }
                    </IconButton>
                </Typography>
            </Container>
        </footer>
    )
}

export default Footer;