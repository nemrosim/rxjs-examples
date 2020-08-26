const moment = require('moment');
const {Observable, fromEvent} = require('rxjs');
const {take, takeUntil,} = require('rxjs/operators');

let date = 819151255000;

/**
 * This function is doing exactly the same as "interval" from rxjs package
 * It returns incremented Integer on each interval
 */
const timer$ = (interval) => new Observable(subscriber => {
    let iteration = 0;
    const intervalId = setInterval(() => {
        subscriber.next(iteration++);

        /**
         * This IF will not be triggered
         * because we are using "take" function in a pipe()
         */
        if (iteration === 6) {
            subscriber.complete();
        }
    }, [interval])

    /**
     * !!!!! THIS IS REQUIRED TO CLEAN INTERVAL
     */
    return () => {
        console.log("✅ Return function. Interval is cleaned");
        clearInterval(intervalId);
    }
});

const ownObserver = {
    next: () => {
        date += 1000
        const res = moment(new Date(date));
        console.log('✔️', res.format('HH:mm:ss'));
    },
    error: () => console.log('🆘 Some error occurred'),
    complete: () => console.log("✅ COMPLETED!"),
};

const stopTimer$ =(time)=> new Observable((subscriber => {
    setTimeout(()=>{
        subscriber.next();
    },[time])
}));
// OR
const stopTimerAfterClick$ = fromEvent('some-button', 'click');

timer$(1000).pipe(
    /**
     * It will process 3 values and STOP
     */
    take(3),
    // OR
    /**
     * Process data until observable will be returned from stopTimer()
     */
    takeUntil(stopTimer$(2000))
).subscribe(ownObserver);


