const {of} = require('rxjs');
const {map, filter} = require('rxjs/operators');

of(1, 2, 3, 4, 5, 6).pipe(
    map(value => value * 2),
    filter(value => value > 5)
).subscribe(val => console.log(val));

