import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import SignIn from './components/SignIn';
import store from './redux/store';

window.store = store;

const Root = () => (
  <Provider store={store}>

    <div className="container">

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </div>

  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
