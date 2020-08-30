import { Observable } from 'rxjs';
import { bufferTime } from 'rxjs/operators';

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 1 (200)'), 200);
    setTimeout(() => subscribe.next('🟢 2 (300)'), 300);
    setTimeout(() => subscribe.next('🟢 3 (600)'), 600);
    setTimeout(() => subscribe.next('🟡 4 (1200)'), 1200);
    setTimeout(() => subscribe.next('🟡 5 (1600)'), 1600);
    setTimeout(() => subscribe.next('🟡 6 (1800)'), 1800);
    setTimeout(() => subscribe.next('🔴 7 (2000)'), 2000);
    setTimeout(() => subscribe.next('🔴 8 (2900)'), 2900);
    setTimeout(() => subscribe.next('🔴 9 (3100)'), 3100);
});

observable$
    .pipe(
        bufferTime(1000, 1500)
    )
    .subscribe(
        value => console.log("✔️ Value:", value),
        () => console.log('🆘 Error'),
        () => console.log('✅ Completed!')
    );

