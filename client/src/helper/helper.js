import jwtDecode from 'jwt-decode';

export const convertTime = (time) => {
  let timeSplit = time.split(':');
  let newNum = parseInt(timeSplit[0], 0);
  if (newNum === 0) {
    timeSplit[0] = 12;
    timeSplit[2] = ' am';
  } else if (newNum > 12) {
    newNum -= 12;
    timeSplit[0] = newNum;
    timeSplit[2] = ' pm';
  } else {
    timeSplit[0] = newNum;
    timeSplit[2] = ' am';
  }
  timeSplit = timeSplit.map(String);
  timeSplit.splice(1, 0, ':');

  const newTime = timeSplit.join('');
  return newTime;
};

// using this method to get the role instead of putting it in plain text in local storage
export const getRole = () => {
  if (localStorage.getItem('tkid')) {
    const decodeRole = jwtDecode(localStorage.getItem('tkid'));
    return decodeRole.role;
  }
  return null;
};

// format the phone number
export const phoneFormat = (phone) => {
  const phoneArr = phone.split('-');
  if (phoneArr.length > 3) {
    console.log(true);
  }
  console.log(phoneArr);
};

export const transformSimpleDate = (date) => {
  const newDate = date.split('T');
  newDate.pop();
  return (newDate[0]);
};
