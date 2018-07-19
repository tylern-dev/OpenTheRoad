import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch';

const UserManagement = props => (
  <Fragment>
    <h2>User Management</h2>
    <Link to="/admin/user-management/addUser">Add User</Link>

    <UserSearch {...props} />
  </Fragment>
);

export default UserManagement;
