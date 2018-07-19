//req.userDecode comes from jwt middleware
const jwt = require('jsonwebtoken');
const BikeEvent = require('../models/EventSchema');
const User = require('../models/UserSchema');
exports.user_event_signup = (req, res, next) => {
  // console.log('req user',req.userDecode)
  const {event, bike, reach, saddleHeight} = req.body;
  User.findById(req.userDecode.id)
    .exec()
    .then( user =>{


        // measurements:{
        //   reach: reach,
        //   saddleHeight: saddleHeight
        // }


    })
    .catch(err=>{
      res.json(err)
    })
  // res.json({message: 'ok'})
}

exports.userInfo = (req, res, next) => {
  // console.log(req.userDecode
  User.findById(req.userDecode.id)
    .select('firstName lastName email homeAddress eventsSignedUpFor phone measurements')
    .exec()
    .then( user =>{
      res.status(200).json({message: "OK", user: user})
    })
    .catch( err =>{
      res.status(401).json({message: "Invalid User", error: err})
    })
}

exports.searchUser = (req, res, next) =>{

  const {search} = req.body;
  const stringSplit = search.split(' ');
  const testStr = stringSplit.map( string => new RegExp(string, 'gi'));
  const [first, second, ...rest] = testStr;
  User.find()
    .or([{firstName: first }, {lastName: first || second || rest}, {email: first}]) // searches for firstname, lastname, or email
    .select('firstName lastName email homeAddress eventsSignedUpFor phone measurements role') // return only these fields
    .exec()
    .then( result=>{
      console.log(result)
      res.status(200).json(result)
    })
    .catch( err => res.status(400).json({message: 'Error in Search'}))
}

// allows user to update their profile
exports.updateUserProfile = (req, res, next) => {
  // console.log(req.body._id)
  const {firstName, lastName, email, phone, homeAddress} = req.body

  User.findByIdAndUpdate({_id: req.body._id})
    .exec()
    .then(user=> {
      user.set({
        firstName,
        lastName,
        email,
        phone,
        homeAddress
      })
      user.save()
        .then(result => {
          // sign a new token with updated info
          jwt.sign({firstName: result.firstName, lastName: result.lastName, id: result.id, role: result.role}, process.env.JWT_SECRET, {expiresIn: '24h'}, (err, token)=>{
            if(err){
              res.status(400).json({message: 'Error Updating user'})
            } else {
              res.status(200).json({token: token})
            }
          })
        })
        .catch(err => {
          console.log('ERROR saving', err)
          res.status(400).json({message: 'Error saving the user data'})
        })
    })
    .catch(err => {
      console.log('Err finding user', err )
      res.status(400).json({message: 'Error finding user in Database'})
    })


}