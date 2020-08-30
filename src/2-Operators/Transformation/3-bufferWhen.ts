import { interval, Observable } from 'rxjs';
import { bufferWhen } from 'rxjs/operators';

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 1 (200)'), 200);
    setTimeout(() => subscribe.next('🟢 2 (300)'), 300);
    setTimeout(() => subscribe.next('🟢 3 (600)'), 600);
    setTimeout(() => subscribe.next('🟡 4 (800)'), 800);
    setTimeout(() => subscribe.next('🟡 5 (1000)'), 1000);
    setTimeout(() => subscribe.next('🟡 6 (1200)'), 1200);
    setTimeout(() => subscribe.next('🔴 7 (1300)'), 1300);
    setTimeout(() => subscribe.next('🔴 8 (1400)'), 1400);
    setTimeout(() => subscribe.next('🔴 9 (1500)'), 1500);
});

observable$
    .pipe(
        bufferWhen(() => interval(1000))
    )
    .subscribe(value => console.log("✔️ Value", value));

