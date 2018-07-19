import React, { Fragment, Component } from 'react';

import AccountAPI from '../API/accountAPI';
import Profile from './Profile';

// allow the admin to pull the data from user
export default class AdminUserProfile extends Component {
  Account = new AccountAPI();


  render() {
    return (
      <Fragment>
        <h1>Admin View of User Profile</h1>
        <input type="button" value="Edit Account" />
        <input type="button" value="Change Password" />
        <input type="button" value="Delete Account" />
        {this.props.userData.map(user => <Profile key={user._id} user={user} />)}

      </Fragment>
    );
  }
}
