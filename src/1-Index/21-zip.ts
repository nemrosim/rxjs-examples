import { from, zip } from 'rxjs';
import { delay, map } from "rxjs/operators";

const ids$ = from([1, 2, 3]).pipe(delay(300))

const names$ = from(['John', 'Ian', 'Jack']).pipe(delay(500));

const emails$ = from([
    'john@gmail.com',
    'ian@gmail.com',
    'jack@gmail.com'
]).pipe(delay(1000));

zip(
    ids$,
    names$,
    emails$
).pipe(
    map(([id, name, email]) => ({id, name, email})),
).subscribe(x => console.log(x));

