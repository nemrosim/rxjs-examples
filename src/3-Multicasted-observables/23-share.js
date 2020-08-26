// multicast()
/*
Takes a subject as a parameter
Must call connect() to begin execution
 */

/*

refCount()
Executes when observers > 0


 */

/*

publish()

Thin wrapper about multicast()
Not required to pass it a Subject

 */

/*
share()
- Executes when observers > 0
- Re-subscribes as necessary
 */

const {interval, Subject} = require('rxjs');
const {take, share, refCount} = require('rxjs/operators');


const source$ = interval(1000)
    .pipe(
        take(4),
        /**
         * Share is a combination of refCount() and publish().
         * BUT!
         * If all previous execution finished
         * Then new subscription will be started from scratch.
         */
        share()
    );


source$.subscribe(
    value => console.log('🔴 ========', value)
)

setTimeout(() => {
    source$.subscribe(
        value => console.log('🟡 Timer 1:', value)
    )
}, [1000])

setTimeout(() => {
    source$.subscribe(
        value => console.log('🟢 Timer 2:', value)
    )
}, [2000])

setTimeout(() => {
    source$.subscribe(
        value => console.log('🟪 Timer 3:', value),
        null,
        ()=>console.log('🟪 Timer 3 Completed')
    )
}, [4500])

/*

OUTPUT:

🔴 ======== 0
🔴 ======== 1
🟡 Timer 1: 1
🟢 Timer 2: 1
🔴 ======== 2
🟡 Timer 1: 2
🟢 Timer 2: 2
🔴 ======== 3
🟡 Timer 1: 3
🟢 Timer 2: 3
🟪 Timer 3: 0
🟪 Timer 3: 1
🟪 Timer 3: 2
🟪 Timer 3: 3
🟪 Timer 3 Completed

 */
