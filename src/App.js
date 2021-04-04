import './App.css';
import React, {useEffect} from 'react'
import {connect} from "react-redux";

import GlobalLoader from "./components/GlobalLoader";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";
import {auth} from "./redux/actions/authActions";


function App({loader, user, auth}) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');

    useEffect(() => {
        auth ()
    },[])

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
            {loader && <GlobalLoader />}
            {user != null ? <DefaultLayout/> : <AuthLayout/>}
        </ThemeProvider>
    );
}
//присваевает в props значения со state(redux) -> в connect
function mapStateToProps(state){
    return {
        loader: state.global.gLoader,
        user: state.auth.user
    }
}
function mapDispatchToProps(dispatch){
    return {
        auth: () => dispatch(auth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
