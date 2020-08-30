import { interval, Observable } from 'rxjs';
import { bufferToggle } from 'rxjs/operators';

const current = Date.now();

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 (200)'), 200);
    setTimeout(() => subscribe.next('🟢 (300)'), 300);
    setTimeout(() => subscribe.next('🟢 (600)'), 600);
    setTimeout(() => subscribe.next('🟡 (1200)'), 1200);
    setTimeout(() => subscribe.next('🟡 (1600)'), 1600);
    setTimeout(() => subscribe.next('🟡 (1800)'), 1800);
    setTimeout(() => subscribe.next('🔴 (2000)'), 2000);
    setTimeout(() => subscribe.next('🔴 (2900)'), 2900);
    setTimeout(() => subscribe.next('🔴 (3100)'), 3100);
});

observable$
    .pipe(
        bufferToggle(interval(500), () => interval(1000))
    )
    .subscribe(
        value => console.log("✔️ Value:", value),
        () => console.log('🆘 Error'),
        () => console.log('✅ Completed!')
    );

