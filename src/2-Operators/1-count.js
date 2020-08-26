const {of} = require('rxjs');
const {count} = require('rxjs/operators');

of(1, 4, 33, 41, 58, 61).pipe(
    count(),
).subscribe(val => console.log(val));

/*

OUTPUT:
6

 */
