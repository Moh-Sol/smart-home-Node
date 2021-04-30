


const { Router } = require('express');
const router = new Router();
const device_controller = require('../controllers/deviceController')


//ex. http://localhost:3000/devices/ac?temperature=20&state=on
router.get('/ac', device_controller.ac_controller);

//ex.  http://localhost:3000/devices/vacuum?state=on
router.get('/vacuum', device_controller.vacuum_controller);

//ex. http://localhost:3000/devices/light?state=on&brightness=0.5&color=red&area=garden

router.get('/light', device_controller.light_controller);


//ex.  http://localhost:3000/devices/blind?state=down
router.get('/blind', device_controller.blind_controller);


//ex.  http://localhost:3000/devices/lock?state=unlocked
router.get('/lock', device_controller.lock_controller);


//ex.  http://localhost:3000/devices/camera?state=on
router.get('/camera', device_controller.camera_controller);


//ex.  http://localhost:3000/devices/speaker?state=on
router.get('/speaker', device_controller.speaker_controller);







module.exports = router;