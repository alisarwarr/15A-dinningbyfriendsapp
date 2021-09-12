import React from 'react';
import * as style from './Loading.module.scss';
import classnames from 'classnames';


interface LoadingProps {
    sentence: String;
}

function Loading({ sentence }: LoadingProps) {
    return (
        <div className={style.loading}>
            <div className={classnames(style.jumbotron, "jumbotron", "jumbotron-fluid")}>
                <div className="container">
                    <h1>
                        <span style={{ overflowY: "hidden", fontWeight: "bold" }}> {sentence} </span>
                        <div className="spinner-grow text-warning mt-3" style={{ width: "1.2rem", height: "1.25rem", overflowY: "hidden" }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger mt-3" style={{ width: "1.2rem", height: "1.25rem", overflowY: "hidden" }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success mt-3" style={{ width: "1.2rem", height: "1.25rem", overflowY: "hidden" }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Loading;