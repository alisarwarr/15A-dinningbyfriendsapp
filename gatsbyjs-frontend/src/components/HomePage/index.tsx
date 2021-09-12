import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
//REACT-HELMET
import Head from '../Head';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';


function HomePage() {
    const dark = useSelector(selectDark);

    return (
        <>
            <Head title="Home"/>

            <div className="homepage" id={dark ? "bg1" : "bg2"}>
                <div className="homepage_header">
                    <Header
                    />
                </div>
    
                <div className="homepage_body">
                    <Body
                    />
                </div>
    
                <div className="homepage_footer">
                    <Footer
                    />
                </div>
            </div>
        </>
    )
}

export default HomePage;