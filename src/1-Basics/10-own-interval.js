const moment = require('moment');
const {Observable} = require('rxjs');

let date = 819151255000;

/**
 * This function is doing exactly the same as "interval" from rxjs package
 * It returns incremented Integer on each interval
 */
const timer$ = (interval) => new Observable(subscriber => {
    let iteration = 0;
    const intervalId = setInterval(() => {
        subscriber.next(iteration++);

        if (iteration === 6) {
            subscriber.complete();
        }
    }, [interval])

    /**
     * !!!!! THIS IS REQUIRED TO CLEAN INTERVAL
     */
    return () => {
        console.log("Interval is cleaned");
        clearInterval(intervalId)
    }
});

const timerOne = timer$(1000).subscribe(() => {
        date += 1000
        const res = moment(new Date(date));
        console.log(res.format('HH:mm:ss'));
    },
    () => console.log('Some error occurred'), // error handler
    () => console.log("COMPLETED! Timer is done") // complete handler
);

const timerTwo = timer$(1000).subscribe(() => {
        date += 1000
        const res = moment(new Date(date));
        console.log(res.format('HH:mm:ss'));
    },
    () => console.log('Some error occurred'), // error handler
    () => console.log("COMPLETED! Timer is done") // complete handler
);

timerOne.add(timerTwo)
