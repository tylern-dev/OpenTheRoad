import React, { Fragment } from 'react';
import AccountAPI from '../API/accountAPI';
import Profile from '../components/Profile';
import { Link, Route } from 'react-router-dom';
import RiderMeasurements from '../components/RiderMeasurements';
import EditAccount from '../components/EditAccount';


// this allows the logged in user to see their own information

class Account extends React.Component {
  Account = new AccountAPI();

  state={
    user: [],
    toggleMeasurements: false,
    toggleEdit: false,
  }
  componentDidMount() {
    this.loadAccountInfo();
  }

  // trying async await rather than .then .catch
  loadAccountInfo = async () => {
    try {
      const data = await this.Account.getAccount();
      this.setState({ user: [data.user] });
      // console.log('DATA', this.state);
    } catch (err) {
      this.props.history.push('/login');
      console.log(err);
    }
  }


  toggleMeasurements = () => {
    this.setState({
      toggleMeasurements: !this.state.toggleMeasurements,
    });
  }

  toggleEdit = () => {
    this.setState(prevState => ({ toggleEdit: !prevState.toggleEdit }));
  }

  render() {
    return (

      this.state.toggleEdit // if the edit button is pressed then render the edit account button
        ? this.state.user.map(user => <EditAccount key={user._id} user={user} toggleEdit={this.toggleEdit} loadUpdate={this.loadAccountInfo} />)
        : (
          <Fragment>
            <h1>Account Overview</h1>
            <input type="button" value="Edit Account" onClick={this.toggleEdit} />
            { this.state.user.map(user => <Profile key={user._id} title="Profile" user={user} />) }


            {/* !do something with the rider's measurements */}
            <RiderMeasurements title="Measurements" />
          </Fragment>
        )


    );
  }
}
export default Account;
