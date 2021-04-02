import React from 'react';
import LoginPage from "../pages/LoginPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";

export default function AuthLayout(){
    return(
        <Router>
            <Switch>
                <Route path="/" component={LoginPage} exact/>
                <Route path="/register" component={RegisterPage}/>
            </Switch>
        </Router>

    )

}
