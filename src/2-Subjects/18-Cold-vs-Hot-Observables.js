/*

Cold Observables:
1. Value producer created inside the observable
2. One observer per execution
3. Unicast
4. Examples include interval(), ajax()

 */

/*

Hot Observables:
1. Value producer exists outside the observable;
2. Share producer allows for multiple observers
3. Multicast
4. Examples include Observable
 that wrap DOM events, WebSockets

 */

const {interval} = require('rxjs');
const {take} = require('rxjs/operators');

const source$ = interval(1000)
    .pipe(take(4));

source$.subscribe(
    value => console.log('🟢 ', value)
)

setTimeout(() => {
    source$.subscribe(
        value => console.log('Timer 1:', value)
    )
}, [1000])

setTimeout(() => {
    source$.subscribe(
        value => console.log('Timer 2:', value)
    )
}, [2000])

/*

Output:
🟢  0
🟢  1
Timer 1: 0
Timer 2: 0
🟢  2
Timer 1: 1
Timer 2: 1
🟢  3
Timer 1: 2
Timer 2: 2
Timer 1: 3
Timer 2: 3

 */
