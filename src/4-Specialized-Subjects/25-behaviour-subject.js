/*

AsyncSubject:

- Only emits the last value received;
- Used by the publishLast() operator;

=========================================

BehaviourSubject:
- Emits initial seed value if source has not yet produced a value
- Emits most recent value otherwise;
- Used by the publishBehaviour() operator;

=========================================

ReplaySubject:
- Stores and emits multiple values to all observers;
- Used by the publishReplay() operator;

 */

const {interval} = require('rxjs');
const {take, publishBehavior, refCount} = require('rxjs/operators');


const source$ = interval(1000)
    .pipe(
        take(4),
        publishBehavior(42),
        refCount(),
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
        () => console.log('🟪 Timer 3 Completed')
    )
}, [4500])

/*

OUTPUT:

🔴 ======== 42
🔴 ======== 0
🟡 Timer 1: 0
🟢 Timer 2: 0
🔴 ======== 1
🟡 Timer 1: 1
🟢 Timer 2: 1
🔴 ======== 2
🟡 Timer 1: 2
🟢 Timer 2: 2
🔴 ======== 3
🟡 Timer 1: 3
🟢 Timer 2: 3
🟪 Timer 3 Completed

 */

