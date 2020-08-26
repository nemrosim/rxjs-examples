/*

- Tests asynchronous code synchronously;
- Currently only works with AsyncScheduler;
- Constructor is passed function to be used for equality tests;
- run() method accepts a callback that performs tests;
- Using run() method is recommended.
 */

const {TestScheduler} = require('rxjs/testing');
