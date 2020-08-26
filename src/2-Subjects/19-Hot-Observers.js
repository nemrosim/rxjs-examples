const {interval, Subject} = require('rxjs');
const {take} = require('rxjs/operators');

const source$ = interval(1000)
    .pipe(take(4));

/*
 * All is the same as in Example 18,
 * but we will add a Subject
 */

const subject$ = new Subject();
source$.subscribe(subject$);

subject$.subscribe(
    value => console.log('🔴 ========', value)
)

setTimeout(() => {
    subject$.subscribe(
        value => console.log('🟡 Timer 1:', value)
    )
}, [1000])

setTimeout(() => {
    subject$.subscribe(
        value => console.log('🟢 Timer 2:', value)
    )
}, [2000])

/*

Output:
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

 */
