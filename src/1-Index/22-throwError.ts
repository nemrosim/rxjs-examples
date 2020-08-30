import { from, isObservable, throwError, zip } from 'rxjs';
import { delay, map } from "rxjs/operators";

const ids$ = from([1, 2, 3]).pipe(delay(300))

const names$ = from(['John', 'Ian', 'Jack']).pipe(delay(500));

const emails$ = from([
    'john@gmail.com',
    'ian@gmail.com',
    'error@gmail.com',
]).pipe(
    delay(1000),
    // @ts-ignore
    map((email: string) => {
        if (email === 'error@gmail.com') {
            throw new Error('Some')
        } else {
            return email;
        }
    }));

zip(
    ids$,
    names$,
    emails$
).pipe(
    map(([id, name, email]) => {

        const is = isObservable(email);
        console.log('is',email)

        return ({id, name, email});
    }),
).subscribe(
    x => console.log(x),
    error => console.log('🔴 ! ALARM ! 🔴'),
);

