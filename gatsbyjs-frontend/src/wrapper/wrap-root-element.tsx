import React from 'react';
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports.js';
//MATERIAL-UI
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
//REDUX-TOOLKIT
import { Provider } from 'react-redux';
import { store } from '../toolkit/store';


export const wrapRootElement = ({ element }) => {
    const muiTheme = createTheme({
       //mui_breakpoints ( using for signin form & signup form purpose only, otherwise react-bootstrap breakpoints used )
        breakpoints: {
            values: {
               xs: 0,
               sm: 535,
               md: 670,
               lg: 1280, //default
               xl: 1920  //default
            }
        }
    });


    Amplify.configure(awsmobile);


    return <Provider store={store}> <ThemeProvider theme={muiTheme}>{element}</ThemeProvider> </Provider>;
}