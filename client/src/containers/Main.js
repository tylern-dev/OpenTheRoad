import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Private from './Private'; // for testing purposes
import PrivateRoute from '../components/PrivateRoute';
import Account from './Account';
import Events from '../components/Events';
import EventDetails from '../components/EventDetails';
import Admin from './Admin';
import Mechanic from './Mechanic';
import Signup from '../components/signup/Signup';
import Login from '../components/login/Login';
import { getRole } from '../helper/helper';


// ? Check on the private route I am using. Test it thouroughly

class Main extends Component {
  render() {
    const { updateAuth, isAuth } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" render={props => <Login {...props} updateAuth={updateAuth} />} />
        <Route path="/signup" render={props => <Signup {...props} updateAuth={updateAuth} />} />
        <Route exact path="/events" render={props => <Events {...props} published title="Upcoming Events" />} />
        <Route path="/events/:eventId" render={props => <EventDetails {...props} />} />


        <PrivateRoute exact path="/private" component={Private} isAuth={isAuth} />
        <PrivateRoute path="/profile" component={Account} />

        {getRole() === 'admin' &&
          <Fragment>
            <Switch>
              <PrivateRoute path="/admin" component={Admin} />
              <PrivateRoute path="/mechanicSetup" component={Mechanic} />
            </Switch>
          </Fragment>
        }

        {getRole() === 'mechanic' &&
          <PrivateRoute path="/mechanicSetup" component={Mechanic} />
        }

        <Route path="*" render={() => <h1>page not found</h1>} />

      </Switch>

    );
  }
}

export default Main;
