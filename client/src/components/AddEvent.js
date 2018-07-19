import React, { Fragment } from 'react';
import Form from './Form';
import Input from './Input';
import withEvent from '../hoc/EventsHOC';
import BikeSelection from './BikeSelection';
import EventAPI from '../API/eventAPI';

// WRITE FUNCTION THAT KICKS USER OUT TO LOGIN SCREEN IF SUBMIT COMES BACK WITH 401
// CREATE FUNCTION THAT RESETS THE CHECKMARKS WHEN RESET FORM IS PRESSED
class AddEvent extends React.Component {
  EventData = new EventAPI();

  state={
    bikesForEvent: [],
    address: '',
    title: '',
    city: '',
    state: '',
    country: '',
    date: '',
    time: '',
    description: '',
  }

  // componentDidMount() {
  //   this.loadBikes();
  // }

  changeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // push bikes to array or remove from array in state
  bikeArray = (event) => {
    // console.log(event.target.checked);

    if (event.target.checked) {
      this.setState({
        bikesForEvent: [...this.state.bikesForEvent, event.target.value],
      });
    } else {
      const bike = [...this.state.bikesForEvent];
      const index = bike.indexOf(event.target.value);
      bike.splice(index, 1);
      this.setState({ bikesForEvent: bike });
    }
  }

  // this needs to work with the eventHOC

  submitEvent = (event) => {
    const submitType = event.target.value;
    event.preventDefault();
    const eventData = { ...this.state };
    delete eventData.bikes;
    // determines which button was pressed
    if (submitType === 'publish') {
      eventData.published = true;
    } else {
      eventData.published = false;
    }

    this.EventData.createEvent(eventData)
      .then((result) => {
        console.log('Result on AddEvent', result);
        this.props.history.push('/admin/event-management');
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/login');
        localStorage.clear();
      });
    console.log(eventData);
  }

  clearForm = (event) => {
    event.preventDefault();
    this.setState({
      title: '',
      address: '',
      city: '',
      state: '',
      country: '',
      date: '',
      time: '',
      description: '',
      bikesForEvent: [],
    });
  }


  render() {
    const {
      title, address, city, state, country, date, time, description,
    } = this.state;
    return (
      <Fragment>
        <h2>Add Event Page</h2>
        <Form>
          <Input type="text" name="title" label="Event Title" onChange={this.changeValue} value={title} />
          <Input type="text" name="address" label="Address" onChange={this.changeValue} value={address} />
          <Input type="text" name="city" label="City" onChange={this.changeValue} value={city} />
          <Input type="text" name="state" label="State" onChange={this.changeValue} value={state} />
          <Input type="text" name="country" label="Country" onChange={this.changeValue} value={country} />
          <Input type="date" name="date" label="Date of Event" onChange={this.changeValue} value={date} />
          <Input type="time" name="time" label="Roll out time" onChange={this.changeValue} value={time} />
          <label>Event Description:
            <textarea name="description" onChange={this.changeValue} value={description} />
          </label>
          <h3>Select bikes for event:</h3>

          <BikeSelection addBike={this.bikeArray} eventBikes={this.state.bikesForEvent} />

          {/* Add bike selection and a pubish/Save button and save/close button */}
          <button onClick={this.submitEvent} value="publish">Save and Publish</button>
          {/* <button onClick={this.submitEvent} value="save">Save and Close</button> */}
          <button onClick={this.clearForm}>Reset Form</button>
        </Form>


      </Fragment>

    );
  }
}

export default withEvent(AddEvent);
