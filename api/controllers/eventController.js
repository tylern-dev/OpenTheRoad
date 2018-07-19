const BikeEvent = require('../models/EventSchema');

exports.create_event = (req,res,next) =>{
  console.log('headers!!! ---', req.headers)
  if(req.userDecode.role === 'admin'){
    const {...eventInfo} = req.body;
    console.log(eventInfo)
    BikeEvent.create(eventInfo)
      .then( result =>{
        console.log("RESULT--->",result)
        res.status(200).json({message: 'Event created'})
      })
      .catch( err => {
        console.log(err)
        res.status(400).json({message: 'Error creating event', error: err})
      })
  } else{

    res.status(401).json({message: "Not authorized to create event"})
  }
}

exports.event_add_bike = (req, res, next) =>{
  BikeEvent.findById(req.body.eventId)
    .exec()
    .then( result =>{
      result.bikesForEvent.push({bike: req.body.bike})
      result.save()
        .then( result =>{
          console.log(result);
        })
        .catch( err =>{
          console.log(err)
          res.status(400).json({message: "error adding bike"})
        })
      res.json(result)
    })
    .catch(err =>{
      res.json(err)
    })
}

exports.event_remove_bike = (req, res, next) =>{
  BikeEvent.findById(req.body.eventId)
    .exec()
    .then( result =>{
      result.bikesForEvent.id(req.body.eventBikeId).remove()
      result.save()
        .then( result =>{
          console.log(result);
        })
        .catch( err =>{
          console.log(err)
          res.status(400).json({message: "error adding bike"})
        })
      res.json(result)
    })
    .catch(err =>{
      res.json(err)
    })
}

exports.all_events = (req, res, next) =>{
  BikeEvent.find({})
    .then( event =>{
      res.json(event.map(event=> event))
    })
    .catch( err =>{
      res.send(err)
    })
}

exports.current_event = (req, res, next) =>{
  BikeEvent.find({date:{$gte: Date()}})
    .populate({
      path: 'bikesForEvent.bike', // this is how you populate the subdoc fields!!!!!
      // select: 'make model',
      populate:{
        path: 'bike',
        model: 'Bike',
      }
    })
    .sort([['date', 1]])
    .exec()
    .then( result=>{
      // console.log(result)

      res.json(result)
    })
    .catch(err =>{
      console.log(err)
      res.json(err)
    })
}

exports.expired_event = (req, res, next) => {
  BikeEvent.find({date: {$lt: Date()}})
    .then( result =>{
      console.log("EXP EVENTS ===>", result);
      res.json(result)
    })
    .catch( err=>{
      console.log(err);
      res.json(err)
    })
}

exports.event_signup = (req, res, next) =>{
  console.log(req.body)
  BikeEvent.findById(req.body.eventId)
    .exec()
    .then( result =>{

      // looks up the subdocument id for the rider to be saved to bike for event
      const bike = result.bikesForEvent.id(req.body.bikeForEvent)
      bike.set({rider: req.userDecode.id, available: false})
      result.save() // use result.save() because subDocs aren't saved individually
        .then( result =>{
          res.status(200).json(result)
        })
        .catch( err =>{
          res.status(400).json({message: err})
        })
      // console.log("BIKE",bike)
    })
    .catch( err =>{
      console.log(err)
    })
  // res.json(req.userDecode)
}

exports.cancel_signup = (req, res, next) =>{
  BikeEvent.findById(req.body.eventId)
    .exec()
    .then( result =>{
      const bike = result.bikesForEvent.id(req.body.bikeForEvent);
      bike.set({rider: null, available: true})
      result.save()
        .then( result =>{
          res.status(200).json({message: "Registration Canceled", result})
        })
        .catch( err =>{
          res.status(400).json({error: err})
        })
    })
    .catch( err =>{
      console.log(err)
    });
}

// gets the details of the selected event
exports.singleEventDetails = (req, res, next) =>{
  // console.log('PARAMS',typeof req.params.eventId)
  const eventId = req.params.eventId
  BikeEvent.findById(eventId)
    .exec()
    .then( result =>{
      // console.log(result)
      res.status(200).json(result)
    })
    .catch(err =>{
      // console.log(err)
      res.status(400).json({message: 'Event does not exist'})
    })
}

// update the event with new data
exports.updateEvent = (req, res, next) =>{
  const eventId = req.params.eventId;
  console.log(eventId, req.body)
}
