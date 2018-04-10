import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import SignIn from './components/SignIn'
import { Router, Route, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import store from './redux/store';

window.store = store;

const Root = () => {
  return (
    <Provider store={store}>

      <div className="container">
        <Router history={browserHistory}>
          <Route path="/" component={App}/>
          <Route path="/special" component={Home} />
          <Route path="/signin" component={SignIn} />
        </Router>
      </div>

    </Provider>

  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
