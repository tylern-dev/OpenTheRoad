import React, { Fragment, Component } from 'react';
import Form from './Form';
import Input from './Input';

class ChangePassword extends Component {
  render() {
    return (
      <Fragment>
        <h2>Change Password</h2>
        <Form>
          <Input type="password" name="currentPassword" onChange={this.changeValue} label="Current Password" value={this.state.currentPassword} />
        </Form>
      </Fragment>
    );
  }
}

export default ChangePassword;
