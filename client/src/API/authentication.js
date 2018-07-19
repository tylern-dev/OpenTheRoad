import axios from 'axios';
import jwt_decode from 'jwt-decode';

const tokenName = 'tkid';

class Authentication {
  constructor(user) {
    this.user = user;
    this.localToken = localStorage.getItem(tokenName);
  }

  login = (email, password) =>
    new Promise((resolve, reject) => {
      axios({
        url: '/authRoute/login',
        method: 'post',
        data: {
          email,
          password,
        },
      })
        .then((result) => {
          console.log(result);
          localStorage.setItem(tokenName, result.data.token);

          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    })

    logout = () => {
      localStorage.clear();
    }

    signUp = data =>
      new Promise((resolve, reject) => {
        const {
          email, password, firstName, lastName, phone, isAdult, address, city, state, zip,
        } = data;
        console.log(data);
        axios({
          url: '/authRoute/signup',
          method: 'POST',
          data: {
            email,
            password,
            firstName,
            lastName,
            phone,
            isAdult,
            address,
            city,
            state,
            zip,
          },
        })
          .then((result) => {
            console.log(result);
            localStorage.setItem(tokenName, result.data.token);
            resolve(result);
          })
          .catch((err) => {
            console.log('Error!!!', err);
            reject(err);
          });
      });


  checkToken = () =>
    new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: '/authRoute/validateToken',
        headers: { Authorization: `Bearer ${localStorage.getItem(tokenName)}` },
      })
        .then((result) => {
          // console.log(result);
          resolve(result);
        })
        .catch((err) => {
          if (err) {
            reject(err);
          }
        });
    });

  // this check to make sure that the token is valid for the private route
  // not working properly
  privateRouteCheck = () => {
    let tokenValid = false;
    if (localStorage.getItem(tokenName)) {
      try {
        const decode = jwt_decode(localStorage.getItem(tokenName));
        // console.log('decode', decode);
        const currentTime = new Date().getTime() / 1000;
        if (currentTime < decode.exp) {
          tokenValid = true;
          return tokenValid;
        }
      } catch (err) {
        console.log(err);
      }

      return null;
    }
    return null;
  }
}


export default Authentication;
