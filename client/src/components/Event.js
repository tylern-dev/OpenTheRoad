import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { convertTime } from '../helper/helper';


const Event = ({ event, ...props }) => (

  <Fragment>
    {/* if the page is eventManagement go to to different URL */}
    {props.level === 'admin'
      ? <Link to={`/admin/event-management/${event._id}`}><h3>{event.eventName}</h3></Link>
      : <Link to={`/events/${event._id}`}><h3>{event.eventName}</h3></Link>
      }

    <span>{format(addDays(event.date, 1), 'MM/DD/YYYY')}</span>

    {event.time !== '' && <span> {convertTime(event.time)} </span>}
    <br />
    <span>{event.location.address}</span>
    <br />
    <span>{event.location.city}, </span>
    <span>{event.location.state} </span>
    <span>{event.location.country}</span>
    {/* {props.level === 'admin' &&
        <button onClick={props.deleteEvent}>Delete</button>
      } */}

  </Fragment>
);

export default Event;
