import React from 'react';
import Checkbox from './Checkbox';
import EventAPI from '../API/eventAPI';


class BikeSelection extends React.Component {
  EventData = new EventAPI();

  state={
    loading: true,
  }

  componentDidMount() {
    this.loadBikes();
  }

  loadBikes = () => {
    console.log('loaded bikes');
    this.EventData.getBikes()
      .then((results) => {
        this.setState({
          bikes: results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.bikes) {
      return (<h3>Loading...</h3>);
    }


    return (
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Size</th>
            <th>Fleet</th>
            <th>Make</th>
            <th>Model</th>

          </tr>
        </thead>
        <tbody>
          { this.state.bikes.map(bike => (

            <tr key={bike._id} >
              <td>
                {/* ! FIGURE OUT HOW TO CHECK THE BOX FOR EDIT EVENT OPTION */}
                <Checkbox
                  value={bike._id}
                  addBike={this.props.addBike}
                  eventBikes={this.props.eventBikes}

                />
              </td>
              <td>{bike.size}</td>
              <td>{bike.fleet}</td>
              <td>{bike.make}</td>
              <td>{bike.model}</td>

            </tr>
      ))}

        </tbody>
      </table>
    );
  }
}


export default BikeSelection;
