import React, { Fragment } from 'react';
import withEvent from '../hoc/EventsHOC';
import Event from '../components/Event';

// Determins if the Events container needs to display either the published or unpublished events
// gets the data from EventsHOC
class Events extends React.Component {
  state={
    groupedCities: [],
  }

  componentDidMount() {
    this.isPublishedEvent();
    this.groupCities();
  }

  isPublishedEvent = () => {
    if (this.props.published) {
      this.setState({
        published: true,
      });
    } else {
      this.setState({
        published: false,
      });
    }
  }

  // ! CONTINUE WORKING ON THIS
  // group results by city
  groupCities = () => {
    const cityGroups = this.props.events.reduce((groups, item) => {
      const value = item.location.city;
      groups[value] = groups[value] || [];
      groups[value].push(item);
      return groups;
    }, {});
    // after the cities have been reduced into their respective groups, set state
    this.setState({
      groupedCities: [cityGroups],
    });
  }

  render() {
    return (

      <Fragment>
        {this.state.groupedCities.map(groupedCity => // get the names of the cities that are grouped
            Object.keys(groupedCity).map((city, index) =>
              (
                <Fragment key={index}>
                  <h2>{city}</h2>
                  {groupedCity[city].map(cityInfo => // for each city, get the info for it
                    <Event key={cityInfo._id} event={cityInfo} level={this.props.level} />,
                  )}
                </Fragment>
              ),
          ),
          )}
      </Fragment>


    );
  }
}

export default withEvent(Events);

