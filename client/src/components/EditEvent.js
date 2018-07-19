import React, { Fragment } from 'react';
import EventAPI from '../API/eventAPI';
import withEvent from '../hoc/EventsHOC';
import Input from '../components/Input';
import BikeSelection from './BikeSelection';
import { transformSimpleDate } from '../helper/helper';

class EditEvent extends React.Component {
  EventAPI = new EventAPI();

  state = {
    title: this.props.eventData.eventName,
    address: this.props.eventData.location.address,
    city: this.props.eventData.location.city,
    state: this.props.eventData.location.state,
    country: this.props.eventData.location.country,
    date: transformSimpleDate(this.props.eventData.date),
    time: this.props.eventData.time,
    description: this.props.eventData.eventDescription,
    bikesForEvent: [],
  }

  componentDidMount() {
    this.bikeIdForState();
  }

  // this function pulls out the bikeid from the bike object inorder for the user update selected bikes properly
  bikeIdForState = () => {
    const fixedBikeArr = [];
    this.props.eventData.bikesForEvent.map(bikeId =>
      fixedBikeArr.push(bikeId.bike),
    );
    this.setState({
      bikesForEvent: fixedBikeArr,
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

  changeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  updateEvent = (event) => {
    const param = this.props.match.params.eventId;
    const data = this.state;
    event.preventDefault();
    console.log('update event');

    this.EventAPI.updateEvent(param, data);
  }


  render() {
    const {
      title, address, city, state, country, date, time, description,
    } = this.state;

    return (
      <Fragment>
        <h1>Edit Event</h1>
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

        <BikeSelection eventBikes={this.state.bikesForEvent} addBike={this.bikeArray} />
        <br />

        <button onClick={this.updateEvent}>Update Event</button>
        <button onClick={this.props.cancelEdit}>Cancel</button>
      </Fragment>
    );
  }
}

export default withEvent(EditEvent);
