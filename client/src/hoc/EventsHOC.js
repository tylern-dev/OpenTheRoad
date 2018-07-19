import React from 'react';
import EventAPI from '../API/eventAPI';

const withEvent = EventComponent =>
  class EventHOC extends React.Component {
    EventData = new EventAPI();

    state={
      events: [],
      loading: true,
    }

    componentDidMount() {
      this.loadEvents();
    }

    loadEvents = () => {
      this.EventData.getEvents()
        .then((results) => {
          this.setState({
            events: results.data,
            loading: false,
          });
        })
        .catch((err) => {
          console.log('err from component', err);
        });
    }

    render() {
      return (
        this.state.loading
          ? <h1>Loading...</h1>
          : <EventComponent
            {...this.props}
            events={this.state.events}

          />
      );
    }
  };

export default withEvent;
