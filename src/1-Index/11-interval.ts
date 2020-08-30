import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const numbers$ = interval(1000)
    .pipe(take(5));

numbers$
    .subscribe(x => console.log(x));
