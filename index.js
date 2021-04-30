const { app } = require('./core');
const fs = require('fs')

const devicesRouter = require('./router/devices')
app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */



app.use('/devices', devicesRouter);




/* Denna get för att få ljudet i spekers funkar */
app.get('/speakers/SPE1/stream', (req, res) => {
    const src = fs.createReadStream('./db/audio/testfile.mp3');
    src.pipe(res);
})


