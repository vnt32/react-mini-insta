import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPage from "../pages/auth/ResetPage";

import {Container} from "@material-ui/core";

export default function AuthLayout(){
    return(
        <Container component="div" maxWidth="xs">
            <Router>
                <Switch>
                    <Route path="/" component={LoginPage} exact/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/reset" component={ResetPage}/>
                </Switch>
            </Router>
        </Container>
    )
}
