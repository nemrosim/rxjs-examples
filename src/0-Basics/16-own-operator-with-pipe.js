const {of, Observable} = require('rxjs');
const {map, filter} = require('rxjs/operators');

const observable$ = of(1, 2, 3, 4, 5);

// Creating your own map
const own_pipe = (someVal) => (observable$) => {
    return observable$.pipe(
        filter(val => val > 2),
        map(val => val * someVal)
    )
}


observable$
    .pipe(own_pipe(6))
    .subscribe(val => console.log('➡️️ Value:', val));


