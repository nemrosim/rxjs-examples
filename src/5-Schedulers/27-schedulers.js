/*

queueScheduler
asyncScheduler
asapScheduler
animationFrameScheduler
TestScheduler

 */

const {of, merge, queueScheduler, asapScheduler, asyncScheduler} = require('rxjs');

console.log('🟢 START')

const queue$ = of('QUEUE (sync)', queueScheduler);
const asap$ = of('ASAP (async micro)', asapScheduler);
const async$ = of('ASYNC (async)', asyncScheduler);

merge(asap$, async$, queue$)
    .subscribe(val => console.log(val));

console.log('🔴 END')

/*

OUTPUT:

🟢 START
QUEUE (sync)
🔴 END
ASAP (async micro)
ASYNC (async)

 */


