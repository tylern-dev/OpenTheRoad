import axios from 'axios';

const tokenName = 'tkid';
// const localToken = localStorage.getItem(tokenName);

class EventAPI {
  constructor() {
    this.localToken = localStorage.getItem(tokenName);
  }
  getEvents = () => (
    new Promise((resolve, reject) => {
      axios.get('/apiEvent/currentEvent')
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(err);
        });
    })
  )

  getBikes = () =>
    new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/apibike/bike',
        headers: { Authorization: `Bearer ${localStorage.getItem(tokenName)}` },
      })
        .then((results) => {
          resolve(results.data);
        })
        .catch((err) => {
          reject(err);
        });
    })

    createEvent = data =>
      new Promise((resolve, reject) => {
        // did this to put array of bikes into an array of objects before sending to db
        const bikes = [];
        for (let i = 0; i < data.bikesForEvent.length; i += 1) {
          bikes.push({ bike: data.bikesForEvent[i] });
        }
        const bikeData = {
          eventName: data.title,
          location: {
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
          },
          time: data.time,
          date: data.date,
          bikesForEvent: bikes,
          eventDescription: data.description,
          published: data.published,
        };
        console.log(bikeData.date);
        axios({
          method: 'post',
          url: '/apiEvent/event',
          headers: { Authorization: `Bearer ${localStorage.getItem(tokenName)}` },
          data: bikeData,
        })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      })

  getSingleEvent = param =>
    new Promise((resolve, reject) => {
      // console.log('param from event details', param);
      axios.get(`/apiEvent/eventDetails/${param}`)
        .then(result => resolve(result.data))
        .catch(err => reject(err));
    })

  updateEvent = (param, data) =>
    new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/apiEvent/event/${param}`,
        headers: { Authorization: `Bearer ${localStorage.getItem(tokenName)}` },
        data,
      });
    })
}


export default EventAPI;
