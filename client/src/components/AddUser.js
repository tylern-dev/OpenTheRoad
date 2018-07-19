import React, { Fragment } from 'react';
import Input from './Input';
import Form from './Form';

class AddUser extends React.Component {
  state={
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    password: '',
    role: '',
    reach: '',
    saddleHeight: '',
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submitUser = (event) => {
    event.preventDefault();
    console.log(this.state);
  }


  render() {
    const { ...state } = this.state;
    return (
      <Fragment>
        <h3>Add User</h3>
        <Form>
          <Input type="text" name="firstName" label="First Name" onChange={this.onChange} value={state.firstName} />
          <Input type="text" name="lastName" label="Last Name" onChange={this.onChange} value={state.lastName} />
          <Input type="email" name="email" label="Email" onChange={this.onChange} value={state.email} />
          <Input type="phone" name="phone" label="Phone" onChange={this.onChange} value={state.phone} />
          <Input type="text" name="address" label="Address" onChange={this.onChange} value={state.address} />
          <Input type="text" name="city" label="City" onChange={this.onChange} value={state.city} />
          <Input type="text" name="state" label="State" onChange={this.onChange} value={state.state} />
          <Input type="number" name="zip" label="Zip" onChange={this.onChange} value={state.zip} />
          <button onClick={this.submitUser}>Submit</button>
        </Form>


      </Fragment>

    );
  }
}

export default AddUser;
