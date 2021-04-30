const { db } = require('../db/index');

/* Denna function för att Omvandla on och off string till boolean  */
let onOrOff = (state) => {
    if (state === 'on') return true
    else if (state === 'off') return false

}


/* Denna function för att Omvandla up och down string till boolean  */
let upOrDown = (state) => {
    if (state === 'up') return false
    else if (state === 'down') return true

}

/* Denna function för att returnera det senaste rätt value  för temperature när anvädaren inte skickar value eller skickar fel value,  d.v.s för att inte få value som är inte number, då kan användare får det senaste value som var rätt*/
let checkAcTemperature = (temperature) => {
    let oldTemperature = db.get('devices').find({ id: "AC1" }).value().temperature;
    
    if (temperature !== undefined && !(isNaN(temperature)) && temperature !== '') {
        return Number(temperature)
    }
    else return oldTemperature


}



/* Denna function för att returnera det senaste rätt value för brightness för lamporna när anvädaren inte skickar något value eller skickar fel value, d.v.s för att inte få value som är inte number, då kan användare får det senaste value som var rätt*/
let checkBrightness = (brightness, id) => {
    let oldBrightness = db.get('devices').find({ id: id }).value().brightness;

    if (brightness !== undefined && !(isNaN(brightness)) && brightness !== '') return Number(brightness)
    else return oldBrightness
}



// Denna funktion ska returnera  ett  viss HEX color när för att kunna användare välja ljus färg mellan 4 färgar  ,
// plus att den ska returnera  det senaste rätt color när anvädaren inte skickar något value eller skickar fel value.
let checkColor = (color, id) => {
    let oldColor = db.get('devices').find({ id: id }).value().color;
    
    switch (color) {

        case 'yellow':
            return ('#FFF600')

        case 'red':
            return ('#FF0800')

        case 'blue':
            return ('#246BCE')

        case 'green':
            return ('#03C03C')

        default:
            return oldColor;

    }

}



module.exports = {
    onOrOff, checkAcTemperature, checkBrightness, upOrDown, checkColor
}