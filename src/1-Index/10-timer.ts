import { timer } from 'rxjs';
import { take } from "rxjs/operators";

/**
 * Start timer after 0 milliseconds,
 * and return each value after 1 second interval
 */
const numbers = timer(0, 1000).pipe(take(5));
numbers.subscribe(x => console.log(x));
