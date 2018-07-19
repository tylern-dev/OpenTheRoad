import React, { Fragment } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import UserManagement from '../components/UserManagement';
import EventManagement from './EventManagement';
import BikeManagment from '../components/BikeManagment';
import AddEvent from '../components/AddEvent';
import AddUser from '../components/AddUser';
import EventDetails from '../components/EventDetails';
import AdminUserProfile from '../components/AdminUserProfile';
import EditEvent from '../components/EditEvent';

// holding these routes in Admin so that they don't get rendered to everyone.

class Admin extends React.Component {
  render() {
    return (
      <Fragment>
        <h1>Admin Page</h1>
        <NavLink to="/admin/user-management">User management</NavLink>
        <NavLink to="/admin/event-management">Event management</NavLink>
        <NavLink to="/admin/bike-management">Bike management</NavLink>

        <Switch>
          {/* used render prop so the react router props could get passed */}
          <Route exact path="/admin/user-management" render={props => <UserManagement {...props} />} />
          <Route exact path="/admin/event-management" component={EventManagement} />
          <Route exact path="/admin/bike-management" component={BikeManagment} />
          <Route path="/admin/event-management/addEvent" component={AddEvent} />
          <Route path="/admin/user-management/addUser" component={AddUser} />
          <Route path="/admin/user-management/:userId" component={AdminUserProfile} />
          <Route path="/admin/event-management/:eventId" component={EventDetails} />

        </Switch>
      </Fragment>
    );
  }
}
export default Admin;
