const {Observable} = require('rxjs');

const currentTime$ = new Observable((subscriber) => {
    const time = new Date().toLocaleTimeString();
    subscriber.next(time);
    subscriber.complete();
})

const sameFunctionCall = () => {
    currentTime$.subscribe(
        currentTime => console.log(`Current time is: ${currentTime}`)
    );
}

/**
 * Call first time
 */
sameFunctionCall();

/**
 * Call second time after 1 second
 */
setTimeout(() => {
    sameFunctionCall();
}, [1000])

/**
 * Call third time after 2 second
 */
setTimeout(() => {
    sameFunctionCall();
}, [2000])

