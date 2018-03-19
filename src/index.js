// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import SignIn from './components/SignIn'
import { Router, Route, browserHistory } from 'react-router';

const Root = () => {
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/special" component={Home} />
        <Route path="/signin" component={SignIn} />
      </Router>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
