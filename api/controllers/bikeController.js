const Bike = require('../models/BikeSchema');

exports.create_bike = (req, res, next) =>{
  const {...bike} = req.body;

  Bike.create(bike)
    .then( result =>{
      console.log(result)
      res.json(result)
    })
    .catch( err =>{
      console.log(err)
      res.json(err)
    })

}

exports.all_bikes = (req, res, next) =>{

  Bike.find({})
    .then( bike =>{
      res.json(bike.map( bike => bike))
    })
    .catch(err=>{
      res.send(err)
    });
}

exports.delete_bike = (req, res, next) =>{
  //delete_bike
}

exports.update_bike = (req,res,next) =>{
  //update bike
}