import { Observable, onErrorResumeNext } from 'rxjs';

const observable_1$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 100);
    setTimeout(() => subscribe.next('🟢 One_1'), 200);
});

const observable_2$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🔴 Two'), 1000)
});

onErrorResumeNext(
    observable_1$,
    observable_2$ // will not be present in the result
).subscribe(
        val => console.log(val),
        err => console.log("🆘 Error:", err),
        () => console.log('✅ Completed!'),
    );
