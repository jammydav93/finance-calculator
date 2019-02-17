import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { db, firebase } from '../../firebase';

class WithAuthentication extends React.Component {
  componentDidMount() {
    const { onSetAuthUser } = this.props;

    firebase.auth.onAuthStateChanged((authUser) => {
      onSetAuthUser(authUser);
    });
  }

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: (authUser) => {
    dispatch({ type: 'AUTH_USER_SET', authUser });
    dispatch({ type: 'LOAD_USER_DATA' });

    if (authUser) {
      db.loadFormData(authUser.uid);
    } else {
      dispatch({ type: 'CLEAR_FORM_DATA', authUser });
    }
  },
});

WithAuthentication.propTypes = {
  onSetAuthUser: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default connect(null, mapDispatchToProps)(WithAuthentication);
