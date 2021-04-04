import React from 'react';
import MainPage from "../pages/MainPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from "../components/NavBar";
import {Container} from "@material-ui/core";
import ProfilePage from "../pages/ProfilePage";

export default function DefaultLayout(){
    return(
        <>
            <NavBar/>
            <Container component="div">
                <Router>
                    <Switch>
                        <Route path="/" component={MainPage} exact/>
                        <Route path="/profile" component={ProfilePage} exact/>
                        <Route render={() => (
                            <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                                <h3>404</h3>
                            </div>
                        )}/>
                    </Switch>
                </Router>
            </Container>

        </>

    )
}
