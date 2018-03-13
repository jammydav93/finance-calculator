import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Homepage from "./Homepage";
import Home from "./Home";
import { login, logout, isLoggedIn } from './utils/AuthService';
import './index.css';


class App extends Component {
  render() {
      return (
        <HashRouter>
          <div>
            <h1>Finance Forecaster SPA</h1>

            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/homepage">Homepage</NavLink></li>
              <li><a href="http://localhost:3000/login">Login</a></li>
              <li>
               {
                 (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Save </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Load</button> )
               }
              </li>
              <li>
               {
                 (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Logout</button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Login</button> )
               }
              </li>
            </ul>

            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/homepage" component={Homepage}/>
            </div>


          </div>
        </HashRouter>
      );
    }
}

export default App;
