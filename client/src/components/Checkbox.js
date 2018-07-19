import React from 'react';

class Checkbox extends React.Component {
  state={
    isClicked: false,
  }


  componentDidMount() {
    this.bikeIsChecked();
  }

  // this allows the checkmarks to be removed when the reset button is pressed.
  // it sends in the updated props
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps.eventBikes.length, this.props.eventBikes.length);

    // if this statement is true, then the reset form button was clicked
    if (prevProps.eventBikes.length > this.props.eventBikes.length && this.props.eventBikes.length === 0) {
      this.resetCheck();
    }
  }

  // on edit event page, load in selected bikes for event.
  bikeIsChecked = () => {
    // console.log(this.props.eventBikes);
    this.props.eventBikes.map((bike) => {
      if (bike === this.props.value) {
        return this.setState({
          isClicked: true,
        });
      }
    });
  }


  toggle = () => {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }));
  }
  resetCheck = () => {
    this.setState({
      isClicked: false,
    });
  }

  render() {
    return (
      <input type="checkbox" value={this.props.value} onChange={this.toggle} checked={this.state.isClicked} onClick={this.props.addBike} />
    );
  }
}

export default Checkbox;
