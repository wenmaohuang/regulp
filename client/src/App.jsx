import React, {Component} from 'react';
import HomePage from "../views/HomePage/index.jsx";
// import './App.css'
// import NavBar from "../../../reblog/client/src/views/NavBar";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (<Router>
                <div className="App">

                    </div>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    {/*<Route path="/nav" component={NavBar}/>*/}
                </Switch>
            </Router>)
    }
}


export default App
