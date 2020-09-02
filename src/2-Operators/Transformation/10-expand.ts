import { Observable } from 'rxjs';
import { expand, take } from 'rxjs/operators';

const observable$ = new Observable<number>(subscribe => {
    setTimeout(() => subscribe.next(200), 500);
});

const observable_2$ = (value: number) => new Observable<number>(subscribe => {
    setTimeout(() => {
        subscribe.next(value * 2);
        subscribe.complete();
    }, 500);
});

observable$
    .pipe(
        expand((clickTime) => observable_2$(clickTime)),
        take(10),
    )
    .subscribe(s => console.log(s));
