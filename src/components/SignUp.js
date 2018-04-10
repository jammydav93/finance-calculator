import React, { Component } from 'react';
import {
  Link,
  withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
const uuidv1 = require('uuid/v1');
uuidv1(); // ⇨ 'f64f2940-fae4-11e7-8c5f-ef356f279131'


const SignUpPage = ({ history }) =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history}/>
  </div>

const INITIAL_STATE = {
  username: 'James',
  email: uuidv1() + '@gmail.com',
  passwordOne: 'password',
  passwordTwo: 'password',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

  const {
    history,
  } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        console.log(authUser);
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';


    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Dont have an account?
    {''}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
