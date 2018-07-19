import React, { Fragment } from 'react';
import Form from './Form';

const RiderMeasurements = ({ user, ...props }) => (
  <Fragment>
    {props.title && <h2>{props.title}</h2> }
    { props.isMeasurements === false
      ? (
        <p>No Measurements on file</p>
      ) : (
        <Form>
          <label>Reach:
            <p>{props.reach}</p>
          </label>
          <label>Saddle Height:
            <p>{props.saddleHeight}</p>
          </label>
        </Form>
    )
    }


  </Fragment>

);

export default RiderMeasurements;
