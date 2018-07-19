import axios from 'axios';

const tokenName = 'tkid';
class AccountAPI {
  constructor(uid) {
    this.uid = uid;
  }

  getAccount = () =>
    new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/apiUser/user',
        headers: { Authorization: `Bearer ${localStorage.getItem(tokenName)}` },
      })
        .then(result => resolve(result.data))
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    })

  searchUser = searchParam =>
    new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: '/apiUser/search',
        headers: { Authorization: `Bearer ${localStorage.getItem(tokenName)}` },
        data: { search: searchParam },
      })
        .then(result => resolve(result.data))
        .catch(err => reject(err));
    })
  updateUserProfile = (data) => {
    const userData = {
      _id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      homeAddress: {
        streetAddress: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
      },
    };
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: '/apiUser/updateProfile',
        headers: { Authorization: `Bearer ${localStorage.getItem(tokenName)}` },
        data: userData,
      })
        .then((result) => {
          console.log(result.data);
          localStorage.setItem('tkid', result.data.token);
          if (result.status === 200) {
            resolve();
          } else {
            reject();
          }
        })
        .catch(err => console.log(err));
    });
  }
}


export default AccountAPI;
