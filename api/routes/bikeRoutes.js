const express = require('express');


const bikeController = require('../controllers/bikeController');
const router = express.Router();

router.get('/bike', bikeController.all_bikes);
router.post('/bike', bikeController.create_bike);

module.exports = router;