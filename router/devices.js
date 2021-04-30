


const { Router } = require('express');
const router = new Router();
const device_controller = require('../controllers/deviceController')



router.get('/ac', device_controller.ac_controller);


router.patch('/vacuum', device_controller.vacuum_controller);


router.patch('/light', device_controller.light_controller);


router.patch('/blind', device_controller.blind_controller);


router.patch('/lock', device_controller.lock_controller);


router.patch('/camera', device_controller.camera_controller);


router.get('/speaker', device_controller.speaker_controller);






module.exports = router;