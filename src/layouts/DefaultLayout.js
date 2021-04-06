import React from 'react';
import MainPage from "../pages/MainPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "../components/NavBar";
import {Container, Grow} from "@material-ui/core";
import SettingsPage from "../pages/SettingsPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from 'notistack';

function DefaultLayout(){
    return(
        <>
            <Router>
                <NavBar/>
                <Container component="div">
                    <CssBaseline/>
                    <Switch>
                        <Route path="/" component={MainPage} exact/>
                        <Route path="/settings" component={SettingsPage} exact/>
                        <Route render={() => (
                            <>
                                <CssBaseline/>
                                <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                                    <h3>404</h3>
                                </div>
                            </>
                        )}/>
                    </Switch>
                </Container>
            </Router>
        </>
    )
}

export default function IntegrationNotistack() {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}>
            <DefaultLayout />
        </SnackbarProvider>
    );
}
