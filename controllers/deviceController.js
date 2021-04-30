const { db, update } = require('../db/index');
const extra_functions = require('./extraFunctions');


// ---------------------------------------------
const ac_controller = (req, res) => {


    let isItOn = extra_functions.onOrOff(req.query.state);
    let id = "AC1" /* ID för AC som vi har i DB*/
    let acTemperature = req.query.temperature;
    /* denna kommande if-sats är för att hindra att state för device ändras när användare skickar inte query till server,
    te.x för att device inte stängas av när användaren skickar något undefined value.
    */
    if (isItOn !== undefined) {
        db.get('devices')
            .find({ id: id })
            .assign({
                on: isItOn,
                temperature: extra_functions.checkAcTemperature(acTemperature),
            })
            .value();
        update(); // tell frontend to update state.

        res.send(' AC is updatded')



    }
    else {
        res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
    };


};


// ---------------------------------------------

const vacuum_controller = (req, res) => {

 /* * */   let isItOn = extra_functions.onOrOff(req.query.state);
    let id = 'VAC1';
    if (isItOn !== undefined) {
        db.get('devices')
            .find({ id: id })
            .assign({
                on: isItOn,
            })
            .value();
        update(); // tell frontend to update state.

        res.send(' vacuum is updatded')
    }
    else {
        res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
    }
};

// ---------------------------------------------


const light_controller = (req, res) => {

    let isItOn = extra_functions.onOrOff(req.query.state);
    let lightArea = req.query.area;
    let brightness = req.query.brightness
    let color = req.query.color
    let id;
    switch (lightArea) {
        case 'bedroom':
            id = 'LIG1';
            if (isItOn !== undefined) {
                db.get('devices')
                    .find({ id: id })
                    .assign({
                        on: isItOn,
                        brightness: extra_functions.checkBrightness(brightness, id),
                        color: extra_functions.checkColor(color, id),
                    })
                    .value();
                update(); // tell frontend to update state.
                res.send(' Light i bedroom updatded');
                break;
            }
            else {
                res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
                break;
            }

        case 'living-room':
            id = 'LIG2';
            if (isItOn !== undefined) {
                db.get('devices')
                    .find({ id: id })
                    .assign({
                        on: isItOn,
                        brightness: extra_functions.checkBrightness(brightness, id),
                        color: extra_functions.checkColor(color, id),
                    })
                    .value();
                update(); // tell frontend to update state.
                res.send(' Light i bedroom updatded');
                break;
            } else {
                res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
                break;
            }

        case 'garden':
            id = 'LIG3';
            if (isItOn !== undefined) {
                db.get('devices')
                    .find({ id: id })
                    .assign({
                        on: isItOn,
                        brightness: extra_functions.checkBrightness(brightness, id),
                        color: extra_functions.checkColor(color, id),
                    })
                    .value();
                update(); // tell frontend to update state.
                res.send(' Light i bedroom updatded');
                break;
            } else {
                res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
                break;
            }

        default:
            res.send(' You need to write a right area te.x : &area=garden  ');
            break;
    }
}



// ---------------------------------------------


const blind_controller = (req, res) => {
    let isItOn = extra_functions.upOrDown(req.query.state);
    console.log(isItOn)

    let id = 'BLI1';
    if (isItOn !== undefined) {
        db.get('devices')
            .find({ id: id })
            .assign({
                on: isItOn,
            })
            .value();
        update(); // tell frontend to update state.

        res.send(' blind is updatded')
    }
    else {
        res.send(' You need to send "up" eller "down" i state field, te.x : &state=up ');
    }
}

// ---------------------------------------------

const lock_controller = (req, res) => {

    let key = req.headers['authorization'].split(' ')[1]; /* för att hämta värdet för authorization från Bearer Token som skickas in i headers  */
    let state = req.query.state;
    console.log(key)
    if (key === '1234' && state === 'unlocked') {
        let id = 'LOC1';
        db.get('devices')
            .find({ id: id })
            .assign({
                locked: true,
            })
            .value();
        update(); // tell frontend to update state.

        res.send('The lock is unlocked')
    } else if (key === '1234' && state === 'locked') {
        let id = 'LOC1';
        db.get('devices')
            .find({ id: id })
            .assign({
                locked: false,
            })
            .value();
        update(); // tell frontend to update state.
        res.send('The lock is locked')
    }

    else {
        res.send(' You need to write the right key in your request and send "locked" eller "unlocked" i state field, te.x : &state=unlocked ');
    }



}

// ---------------------------------------------



const camera_controller = (req, res) => {

    let isItOn = extra_functions.onOrOff(req.query.state);
    console.log(isItOn)

    let id = 'CAM1';
    if (isItOn !== undefined) {
        db.get('devices')
            .find({ id: id })
            .assign({
                on: isItOn,
            })
            .value();
        update(); // tell frontend to update state.

        res.send(' Camera is updatded')
    }
    else {
        res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
    }

}


// ---------------------------------------------



const speaker_controller = (req, res) => {

    let isItOn = extra_functions.onOrOff(req.query.state);
    console.log(isItOn)

    let id = 'SPE1';
    if (isItOn !== undefined) {
        db.get('devices')
            .find({ id: id })
            .assign({
                on: isItOn,
            })
            .value();
        update(); // tell frontend to update state.

        // if (isItOn === true) {
        //     res.redirect('/speakers/SPE1/stream'); 
        // } else  res.end(' Speaker is updatded')

      
        res.send(' Speaker is updatded')
       
    }
    else {
        res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
    }

}









module.exports = { ac_controller, vacuum_controller, light_controller, blind_controller, lock_controller, camera_controller, speaker_controller };