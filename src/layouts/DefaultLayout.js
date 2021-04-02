import React from 'react';
import MainPage from "../pages/MainPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export default function DefaultLayout(){
    return(
        <Router>
            <Switch>
                <Route path="/" component={MainPage} exact/>
                <Route render={() => (
                    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                        <h3>404</h3>
                    </div>
                )}/>
            </Switch>
        </Router>

    )

}
