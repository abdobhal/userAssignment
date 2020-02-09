import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Login from "./components/Login/Login";
import Users from "./components/Users/Users";
import UserInfo from "./components/UserInfo/UserInfo";

class Root extends React.Component{

    render(){
        return(
            <Router>
                <Route exact path={["/","/login"]} component={Login} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/users/:userId" component={UserInfo} />
            </Router>
        )
    }
}
export default Root;

