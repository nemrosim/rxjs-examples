import { Observable, combineLatest } from 'rxjs';

const observable_1$ = new Observable(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 100)
    setTimeout(() => subscribe.next('🟢 One_1'), 500)
    setTimeout(() => subscribe.next('🟢 One_2'), 1000)
});

const observable_2$ = new Observable(subscribe => {
    setTimeout(() => subscribe.next('🔴 Two'), 200)
    setTimeout(() => subscribe.next('🔴 Two_1'), 800)
    setTimeout(() => subscribe.next('🔴 Two_2'), 1200)
});

const combined$ = combineLatest(observable_1$, observable_2$);

combined$.subscribe(value => console.log(value));
