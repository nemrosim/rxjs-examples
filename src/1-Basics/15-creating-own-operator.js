const {of, Observable} = require('rxjs');
const {map} = require('rxjs/operators');


/**
 * Own operator. Pseudo-code
 * 1. "Operator" is just a simple function that returns another function;
 * 2. You can pass your own configuration params;
 */
const ownOperator = (configParam1, configParam2) => {
    return (observable$) => {
        return newObservable$;
    }
}

/*
 * ========= Example
 */

const observable$ = of(1, 2, 3, 4, 5);
const doubler = map(val => val * 2);
//
// doubler(observable$).subscribe(val => console.log('➡️️Value:', val));


/*
 * ========= Creating your own doubler
 */


const observable_2$ = of(1, 2, 3, 4, 5);

// Creating your own map
const own_map = (callback) => (observable$) => {
    return new Observable(subscriber => {
        return observable$.subscribe({
            next: value => {
                // with "filter"
                if (value !== 1 && value !== 5) {
                    subscriber.next(
                        callback(value)
                    )
                }

            },
            error: err => subscriber.error(err),
            complete: () => subscriber.complete(),
        });
    });
}


observable_2$.pipe(own_map(val => val * 4)).subscribe(val => console.log('➡️️Value:', val));


