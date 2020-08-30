import { Observable, isObservable, of, from } from 'rxjs';

const observable_1$ = new Observable(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 100)
});

const observable_2$ = of(1,2,3,4,5);

const observable_3$ = from(Promise.resolve(6));

const result = {
    isObservable1: isObservable(observable_1$),
    isObservable2: isObservable(observable_2$),
    isObservable3: isObservable(observable_3$),
}

console.log(result)
