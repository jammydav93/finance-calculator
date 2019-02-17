import React from 'react';
import { connect } from 'react-redux';
import { db, firebase } from '../../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        onSetAuthUser(authUser)
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => {
      dispatch({ type: 'AUTH_USER_SET', authUser })
      dispatch({ type: 'LOAD_USER_DATA' })

      if(authUser) {
        db.loadFormData(authUser.uid)
      } else {
        dispatch({ type: 'CLEAR_FORM_DATA', authUser })
      }
    },
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;
