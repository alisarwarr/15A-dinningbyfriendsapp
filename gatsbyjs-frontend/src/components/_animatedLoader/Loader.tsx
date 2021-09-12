import React from 'react';
//REACT-HELMET
import Head from '../Head';
//SCSS
import './Loader.scss';
//LOADER
export default function() { return <> <Head title="Loading"/> <div className="loader"> Loading... </div> </>; }