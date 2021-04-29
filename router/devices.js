


const { Router } = require('express');
const router = new Router();
const { db, update } = require('../db/index')


/* Denna function för att Omvandla on och off string till boolean  */
let onOrOff = (state) => {
    if (state === 'on') return true
    else if (state === 'off') return false

}


/* Denna function för att Omvandla up och down string till boolean  */
let upOrDown = (state) => {
    if (state === 'up') return true
    else if (state === 'down') return false

}

/* Denna function för att returnera ett default value för temperature när anvädaren inte skickar value,  d.v.s för att inte få undefined value */
let checkAcTemperature = (temperature) => {
    if (temperature !== undefined && !(isNaN(temperature))) return temperature
    else return 17
    // console.log(db.__wrapped__.devices)
    // obs. kanske bättre att få de senaste value som finns redan i db
}



/* Denna function för att returnera ett default value för brightness för lamporna när anvädaren inte skickar något value, d.v.s för att inte få undefined value så att brightness blir null  */
let checkBrightness = (Brightness) => {
    if (Brightness !== undefined && !(isNaN(Brightness))) return Number(Brightness)
    else return 1
    // console.log(db.__wrapped__.devices)
    // obs. kanske bättre att få de senaste value som finns redan i db
}



router.patch('/ac', (req, res) => {
    let isItOn = onOrOff(req.query.state);
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
                temperature: checkAcTemperature(acTemperature)
            })
            .value();
        update(); // tell frontend to update state.

        res.send(' AC is updatded')
    }
    else {
        res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
    };

})


router.patch('/vacuum', (req, res) => {
    let isItOn = onOrOff(req.query.state);
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

})




router.patch('/light', (req, res) => {
    let isItOn = onOrOff(req.query.state);
    let lightArea = req.query.area;
    let brightness = req.query.brightness
    let id;
    switch (lightArea) {
        case 'bedroom':
            id = 'LIG1';
            if (isItOn !== undefined) {
                db.get('devices')
                    .find({ id: id })
                    .assign({
                        on: isItOn,
                        brightness: checkBrightness(brightness)
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
                        brightness: checkBrightness(brightness)

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
                        brightness: checkBrightness(brightness)

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
            break;
    }
})


router.patch('/blind', (req, res) => {
    let isItOn = upOrDown(req.query.state);
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

})



router.patch('/lock', (req, res) => {
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

})








// console.log(req.query)
// console.log(brightness)
// console.log(checkBrightness(brightness))

// console.log(isItOn, temperature)

// console.log(deviceType)
// console.log(req.query)


module.exports = router;