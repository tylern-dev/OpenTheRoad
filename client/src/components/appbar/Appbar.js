import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getRole } from '../../helper/helper';


const Appbar = props => (
  <Fragment>

    <ul>
      <li><NavLink to="/">Logo</NavLink></li>
      {props.isLoggedIn ?

        <Fragment>
          <li><NavLink to="/profile">Account</NavLink></li>
          <li><NavLink to="/events">Events</NavLink></li>

          {getRole() === 'admin' &&
            <Fragment>
              <li><NavLink to="/admin">Administrative</NavLink></li>
              <li><NavLink to="/mechanicSetup">Bike Setup</NavLink></li>
            </Fragment>
          }

          {getRole() === 'mechanic' &&
            <Fragment>
              <li><NavLink to="/mechanicSetup">Bike Setup</NavLink></li>
            </Fragment>
          }

          <li><Link to="/" onClick={props.logout}>Logout</Link></li>

        </Fragment>


    :
        <Fragment>
          <li><NavLink to="/events">Events</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/signup">Sign Up</NavLink></li>
        </Fragment>
    }
    </ul>

  </Fragment>

);

export default Appbar;
