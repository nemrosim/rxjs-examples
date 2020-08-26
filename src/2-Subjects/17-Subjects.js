// Subjects
// Observables
// Observers
// Produce values
// Proxy values
// Have state and maintain a list of observers
// Multicast

// Observable => with subscribe method
// Observers => with next(), error(), complete()
// Observers subscribe to the Observable

const {Subject, Observable} = require('rxjs')


/**
 * Subject class extends the Observable class
 * @type {Subject<unknown>}
 */
const subject$ = new Subject();

subject$.subscribe(
    value => console.log('1️⃣ ', value)
)

subject$.subscribe(
    value => console.log('2️⃣ ', value)
)

/**
 * Value "Hello world" will be pushed to both observers
 */
subject$.next("Hello world!");

/*
 * Output:
 * 1️⃣  Hello world!
 * 2️⃣  Hello world!
 */

new Observable(subscriber => {
    subscriber.next("🟡 Some text")
}).subscribe(subject$)

/*
 * Output:
 * 1️⃣  Hello world!
 * 2️⃣  Hello world!
 * 1️⃣  🟡 Some text
 * 2️⃣  🟡 Some text
 */

