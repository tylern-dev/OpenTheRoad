import React, { Fragment } from 'react';
import Form from './Form';
import { phoneFormat } from '../helper/helper';

const Profile = ({ user, ...props }) => (
  <Fragment>
    {props.title && <h2>{props.title}</h2> }
    <Form>
      <label>Email:
        <p>{user.email}</p>
      </label>
      <label>First Name:
        <p>{user.firstName}</p>
      </label>
      <label>Last Name:
        <p>{user.lastName}</p>
      </label>
      <label>Phone Number:
        <p>{user.phone}</p>
      </label>
      <label>Address:
        <p>{user.homeAddress.streetAddress}</p>
      </label>
      <label>City:
        <p>{user.homeAddress.city}</p>
      </label>
      <label>State:
        <p>{user.homeAddress.state}</p>
      </label>
      <label>Postal Code:
        <p>{user.homeAddress.zip}</p>
      </label>

    </Form>
  </Fragment>

);

export default Profile;
