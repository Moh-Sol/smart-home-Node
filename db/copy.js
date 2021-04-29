



const { Router } = require('express');
const router = new Router();
const { db, update } = require('../db/index')


/* Denna function för att Omvandla on och off string till boolean  */
let tureOrFalse = (state) => {
    if (state === 'on') return true
    else if (state === 'off') return false

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

router.patch('/:device', (req, res) => {
    let deviceType = req.params.device;
    let isItOn = tureOrFalse(req.query.state);
    let id;

    switch (deviceType) {

        case 'ac':
            id = "AC1"; /* ID för AC som vi har i DB*/
            let acTemperature = req.query.temperature;

            /* denna kommande if-sats är för att hindra att state för device ändras när användare skickar inte query till server,
            te.x för att AC inte stängas när användaren skickar något undefined .
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
                break;
            }
            else {
                res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
                break;
            };
        case 'vacuum':
            id = 'VAC1';
            if (isItOn !== undefined) {
                db.get('devices')
                    .find({ id: id })
                    .assign({
                        on: isItOn,
                    })
                    .value();
                update(); // tell frontend to update state.

                res.send(' vacuum is updatded')
                break;
            }
            else {
                res.send(' You need to send "on" eller "off" i state field, te.x : &state=on ');
                break;
            }


        case 'light':
            let lightArea = req.query.area;
            let brightness = req.query.brightness

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


            }

            res.end();
            break;

        default:
            break;

    }




})




// console.log(req.query)
// console.log(brightness)
// console.log(checkBrightness(brightness))

// console.log(isItOn, temperature)

// console.log(deviceType)
// console.log(req.query)


module.exports = router;