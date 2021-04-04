import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    splash: {
        position: 'fixed',
        left:'0',
        right:'0',
        top:'0',
        bottom:'0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        zIndex: 999
    }
}));

export default function GlobalLoader() {
    const {splash} = useStyles();

    return(
        <Container component="div" maxWidth="xs">
            <div className={splash} >
                <CircularProgress/>
            </div>
        </Container>
    )
}
