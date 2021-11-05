import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import '../public/App.css';
import Home from "./Home";
import First from "./First";
import Second from "./Second";
import Third from "./Third";

export default function App() {
    return (
        <>
        <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                {/* write code below */}
                <Route path="/first">
                    <First />
                </Route>
                <Route Route path="/second">
                    <Second />
                </Route>
                <Route path="/third">
                    <Third />
                </Route>
            </Switch>
        </Router>
        </>
    );
}

