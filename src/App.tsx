import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./components/home";
import One from "./components/one";
import Two from "./components/two";
import Three from "./components/three";
import ThreeA from "./components/threea";
import ThreeB from "./components/threeb";
import {NewLogin} from "./components/login";
import withAuthContext from './context/AuthConsumer';
import {IAuthContext} from "./context/auth-context";
import {Spin} from "antd";
import PublicRoute from "./utilities/publicRoute";


const App: React.FC<{ context: IAuthContext }> = ({ context }: { context: IAuthContext; }) => {
  if (!context.isAuthenticated) {
    //console.log("Not authenticated!!")
    //return <Redirect to="/login"/>
  }
  return (
      <BrowserRouter>
        <div>
          <Switch>
            <PublicRoute path="/" component={Home} exact/>
            <Route path="/login" component={NewLogin} exact/>
            <PublicRoute path="/one" component={One} exact/>
            {/*<Route path="/one" component={One} exact/>*/}
            <Route path="/two" component={Two} exact/>
            <Route path="/three" component={Three} exact/>
            <Route path="/threea" component={ThreeA} exact/>
            <Route path="/threeb" component={ThreeB} exact/>
          </Switch>
        </div>
      </BrowserRouter>
  );
};

export default withAuthContext(App);
