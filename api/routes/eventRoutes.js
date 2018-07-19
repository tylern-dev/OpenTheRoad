const express = require('express');
const authCheck = require('../../authMiddleware/jwtAuth');

const eventController = require('../controllers/eventController');
const router = express.Router();

router.get('/event', eventController.all_events);
router.get('/currentEvent', eventController.current_event);
router.get('/expiredEvent', eventController.expired_event);
router.get('/eventDetails/:eventId', eventController.singleEventDetails);

router.post('/event', authCheck, eventController.create_event);

router.put('/event/signup', authCheck, eventController.event_signup);
router.put('/event/cancelSignup', authCheck, eventController.cancel_signup);
router.put('/event/addBike', authCheck, eventController.event_add_bike);
router.put('/event/:eventId', authCheck, eventController.updateEvent);

router.delete('/event/removeBike', authCheck, eventController.event_remove_bike);
module.exports = router;