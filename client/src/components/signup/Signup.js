import React, { Fragment } from 'react';
import withAuthentication from '../../hoc/AuthHOC';
import Form from '../Form';
import Input from '../Input';
import Button from '../Button';

const Signup = ({ onChange, onClick, signup }) => (
  <Fragment>
    <h1>Signup</h1>
    <Form>
      <Input name="email" type="email" label="email" onChange={onChange} />
      <Input name="password" type="password" label="password" onChange={onChange} />
      <hr />
      <Input name="firstName" type="text" label="First Name" onChange={onChange} />
      <Input name="lastName" type="text" label="Last Name" onChange={onChange} />
      <Input name="phone" type="tel" label="Phone Number" onChange={onChange} />
      <Input name="address" type="text" label="Street Address" onChange={onChange} />
      <Input name="city" type="text" label="City" onChange={onChange} />
      <Input name="state" type="text" label="State" onChange={onChange} />
      <Input name="zip" type="text" label="Zip" onChange={onChange} />
      {/* IF NOT OVER 18 ADULT MUST BE PRESENT AT DAY OF EVENT */}
      <label htmlFor="isAdult">Are you over 18?
        <input name="isAdult" type="radio" value="Yes" onChange={onChange} />Yes
        <input name="isAdult" type="radio" value="No" onChange={onChange} />No
      </label>

      <Button label="submit" onClick={signup} />
    </Form>

  </Fragment>
);

export default withAuthentication(Signup);

