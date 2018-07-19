import React, { Fragment, Component } from 'react';
import EventAPI from '../API/eventAPI';
import { getRole } from '../helper/helper';
import { format, addDays } from 'date-fns';
import { convertTime } from '../helper/helper';
import EditEvent from './EditEvent';


class EventDetails extends Component {
  EventData = new EventAPI();

  state={
    editEvent: false,

  }

  componentDidMount() {
    this.loadEventDetails();
  }


  loadEventDetails = async () => {
    const { eventId } = this.props.match.params;
    try {
      const data = await this.EventData.getSingleEvent(eventId);
      this.setState({ eventData: data });
    } catch (err) {
      console.log(err);
    }
  }

  editEvent = () => {
    this.setState(prevState => ({ editEvent: !prevState.editEvent }));
    console.log(this.state.editEvent);
  }

  deleteEvent = () => {
    console.log('delete event');
  }

  render() {
    const { eventData } = this.state;
    let editEventButton;
    let deleteEventButton;


    if (this.props.match.path === '/admin/event-management/:eventId') {
      editEventButton = <button onClick={this.editEvent}>Edit Event</button>;
      deleteEventButton = <button onClick={this.deleteEvent}>Delete Event</button>;
    }


    // display loading if events aren't in state yet
    if (!this.state.eventData) {
      return <h1>Loading ...</h1>;
    }

    return (
      <Fragment>
        {this.state.editEvent
        ? (
          <EditEvent {...this.props} cancelEdit={this.editEvent} eventData={this.state.eventData} />
      ) : (
        <Fragment>
          <h1>Event Details</h1>
          {editEventButton}
          {deleteEventButton}
          <h3>Title</h3>
          <p>{eventData.eventName}</p>
          <h3>Date</h3>
          <p>{format(addDays(eventData.date, 1), 'MM/DD/YYYY')}</p>
          {eventData.time !== '' && (
            <Fragment>
              <h3>Time</h3>
              <p>{convertTime(eventData.time)}</p>
            </Fragment>
        ) }

          <h3>Description</h3>
          <p>{eventData.eventDescription}</p>
        </Fragment>
        )
        }


      </Fragment>
    );
  }
}


export default EventDetails;
