import { from, onErrorResumeNext } from 'rxjs';
import { map } from "rxjs/operators";

const observable_1$ = from([
    'ONE',
    'TWO',
    '🔴 this value will not be returned'
])
    // what should be done with each value?
    .pipe(
        // Works the same way as [].map()
        map(value => {
            if (value === 'TWO') {
                throw new Error("Value === TWO");
            } else {
                return value;
            }
        })
    );

const observable_2$ = from(['FOUR', 'FIVE', 'SIX']);

/**
 * Works like "concat" -> ! not concurrent !
 */
onErrorResumeNext(
    observable_1$,
    observable_2$
).subscribe(
    val => console.log(val),
    err => console.log("Error:", err.message),
    () => console.log('✅ Completed!'),
);
