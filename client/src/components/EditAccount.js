import React, { Fragment } from 'react';
import Input from './Input';
import Form from './Form';
import AccountAPI from '../API/accountAPI';


// ! add in the measurements and what happens when updates are submitted

class EditAccount extends React.Component {
  Account = new AccountAPI();

  state={
    _id: this.props.user._id,
    email: this.props.user.email,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    phone: this.props.user.phone,
    address: this.props.user.homeAddress.streetAddress,
    city: this.props.user.homeAddress.city,
    state: this.props.user.homeAddress.state,
    zip: this.props.user.homeAddress.zip,

  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  updateAccount = (event) => {
    event.preventDefault();
    this.Account.updateUserProfile(this.state)
      .then(() => {
        this.props.toggleEdit(); // return to profile if update successful
        this.props.loadUpdate(); // load the new data from the db to be seen on profile page
      })
      .catch(err => console.log(err));
  }


  render() {
    const { onChange, updateAccount } = this;
    return (
      <Fragment>
        <h3>Edit Account</h3>
        <Form>
          <Input name="email" type="email" label="Email" onChange={onChange} value={this.state.email} />
          <hr />
          <Input name="firstName" type="text" label="First Name" onChange={onChange} value={this.state.firstName} />
          <Input name="lastName" type="text" label="Last Name" onChange={onChange} value={this.state.lastName} />
          <br />
          <Input name="phone" type="tel" label="Phone Number" onChange={onChange} value={this.state.phone} />
          <Input name="address" type="text" label="Street Address" onChange={onChange} value={this.state.address} />
          <Input name="city" type="text" label="City" onChange={onChange} value={this.state.city} />
          <Input name="state" type="text" label="State" onChange={onChange} value={this.state.state} />
          <Input name="zip" type="text" label="Zip" onChange={onChange} value={this.state.zip} />
          <hr />


          <button onClick={updateAccount}>Update</button>
          <input type="button" value="Cancel" onClick={() => this.props.toggleEdit()} />
        </Form>

      </Fragment>

    );
  }
}

export default EditAccount;
