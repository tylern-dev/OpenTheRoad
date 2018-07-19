import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Events from '../components/Events';
import { getRole } from '../helper/helper';


class EventManagement extends React.Component {
  render() {
    return (
      <Fragment>

        <h2>Event Management</h2>
        {/* <Route /> lives in Admin.js */}
        <Link to="/admin/event-management/addEvent">Add Event</Link>

        {/* displays the published events */}
        <Events published title="Published Events" level={getRole()} />

        {/* displays the unpublished events */}
        {/* <Events published={false} title="Unpublished Events" level={getRole()} /> */}
      </Fragment>
    );
  }
}

export default EventManagement;
