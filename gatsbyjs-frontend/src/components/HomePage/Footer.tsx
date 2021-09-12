import React from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';


function Footer() {
    const dark = useSelector(selectDark);

    return (
        <footer
            className="footer page-footer font-small stylish-color-dark pt-4"
            id={dark ? "lightRespectAll" : "darkRespectAll"}
        >
            <div className="footer-copyright text-center"> © 2021 Copyright:
                <a href="https://www.kfcpakistan.com/" target="_blank" rel="noreferrer"> kfcpakistan.com </a>
            </div>
        </footer>
    )
}

export default Footer;