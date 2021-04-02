import './App.css';
import React,{Component} from 'react'
import {connect} from "react-redux";

import GlobalLoader from "./components/GlobalLoader";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";


function App(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: 'dark',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            {props.loader && <GlobalLoader />}
            {props.loggedIn ? <DefaultLayout/> : <AuthLayout/>}
        </ThemeProvider>
    );
}
//присваевает в props значения со state(redux) -> в connect
function mapStateToProps(state){
    return {
        loader: state.global.gLoader,
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(App);
