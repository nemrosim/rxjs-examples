const moment = require('moment');
const {interval} = require('rxjs');

let date = 819151255000;

const source = interval(1000).subscribe(val => {
        date += 1000
        const res = moment(new Date(date));
        console.log(res.format('HH:mm:ss'))

        if (val === 5) {
            source.unsubscribe();
        }
    },
    null, // error handler is NULL
    () => console.log("Timer is done")
);
