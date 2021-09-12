import React from 'react';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
//MATERIAL-UI
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Typography } from '@material-ui/core';
//SWEETALERT2
import { darkAlert } from '../../alerts';
//REACT-REVEAL
import Zoom from 'react-reveal/Zoom';
//IMAGE
import { pic1, pic2 } from '../../images';


function Body() {
    const dark = useSelector(selectDark);
    const dispatch = useDispatch();

    return (
        <>
            <div className="leftdiv">
               <Zoom>
                <div>
                    <Typography className="p1" id={dark ? "darkRespectTextOutlined" : "lightRespectTextOutlined"}>
                        Dining
                    </Typography>
    
                    <Typography className="p2" id={dark ? "lightRespectText" : "darkRespectText"}>
                        “ Dining should be a delightful and a beautiful experience ”
                        <p><b><i> ― Alï Sarwar </i></b></p>
                    </Typography>
                </div>
                </Zoom>
    
                <Zoom>
                <button
                    className="btn"
                    style={{ color: dark ? "#000000" : "#d4d3d3", backgroundColor: dark ? "#d4d3d3" : "#000000" }}
                    onClick={() => {
                        dispatch(changeDark());
                        darkAlert(dark);
                    }}
                >
                    { dark ? <Brightness4Icon fontSize="small" style={{ marginTop: -2.75 }}/>: <Brightness7Icon fontSize="small" style={{ marginTop: -2.75 }}/> }
                    <span style={{ marginLeft: "0.2rem" }}> { dark ? `light` : `dark` } theme </span>
                </button>
                </Zoom>
            </div>

            <div className="rightdiv">
                <div></div>
                <Zoom>
                <img
                    src={dark ? pic2 : pic1}
                />
                </Zoom>
            </div>
        </>
    )
}

export default Body;