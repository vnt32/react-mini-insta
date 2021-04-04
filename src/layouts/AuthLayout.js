import React from 'react';
import LoginPage from "../pages/LoginPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import {Container} from "@material-ui/core";

export default function AuthLayout(){
    return(
        <Container component="div" maxWidth="xs">
            <Router>
                <Switch>
                    <Route path="/" component={LoginPage} exact/>
                    <Route path="/register" component={RegisterPage}/>
                </Switch>
            </Router>
        </Container>
    )
}
