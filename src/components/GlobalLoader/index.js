import React from 'react';
import './style.css';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function GlobalLoader() {
    return(
        <div className="splash" >
            <CircularProgress/>
        </div>
    )
}
