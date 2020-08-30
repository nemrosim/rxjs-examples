import { Observable, race } from 'rxjs';

const observable_1$ = new Observable(subscribe => {
    setTimeout(() => subscribe.next('🔴 One'), 100)
});

const observable_2$ = new Observable(subscribe => {
    setTimeout(() => subscribe.next('🟡 Two'), 200)
});

const observable_3$ = new Observable(subscribe => {
    setTimeout(() => subscribe.next('🟢 Three'), 300)
});

race(
    observable_1$,
    observable_2$,
    observable_3$
).subscribe(x => console.log(x));

