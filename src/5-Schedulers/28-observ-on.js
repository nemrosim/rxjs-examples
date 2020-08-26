/*

queueScheduler
asyncScheduler
asapScheduler
animationFrameScheduler
TestScheduler

 */

const {from, queueScheduler, asapScheduler, asyncScheduler} = require('rxjs');
const {observeOn, tap} = require('rxjs/operators');

console.log('🟢 START')

from([1, 2, 3, 4, 5], queueScheduler)
    .pipe(
        tap(e => console.log(`1️⃣ VALUE : ${e}`)),
        observeOn(asyncScheduler),
        tap(e => console.log(`2️⃣ DOUBLE: ${e * 2}`))
    )
    .subscribe()

console.log('🔴 END')

/*

OUTPUT WITHOUT OBSERVE_ON FUNCTION:

🟢 START
1️⃣ VALUE : 1
2️⃣ DOUBLE: 2
1️⃣ VALUE : 2
2️⃣ DOUBLE: 4
1️⃣ VALUE : 3
2️⃣ DOUBLE: 6
1️⃣ VALUE : 4
2️⃣ DOUBLE: 8
1️⃣ VALUE : 5
2️⃣ DOUBLE: 10
🔴 END

OUTPUT WITH OBSERVE_ON FUNCTION:

🟢 START
1️⃣ VALUE : 1
1️⃣ VALUE : 2
1️⃣ VALUE : 3
1️⃣ VALUE : 4
1️⃣ VALUE : 5
🔴 END
2️⃣ DOUBLE: 2
2️⃣ DOUBLE: 4
2️⃣ DOUBLE: 6
2️⃣ DOUBLE: 8
2️⃣ DOUBLE: 10

 */


