import { interval, Observable } from 'rxjs';
import { audit, tap } from 'rxjs/operators'

const startTime = Date.now();

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One (200)'), 200);
    setTimeout(() => subscribe.next('🟢 One 1 (300)'), 300);
    setTimeout(() => subscribe.next('🟢 One 2 (600)'), 600);
    setTimeout(() => subscribe.next('🟢 One 3 (800)'), 800);
    setTimeout(() => subscribe.next('🔴 Two (1200)'), 1200);
    setTimeout(() => subscribe.next('🔴 Two 1 (1400)'), 1400);
    setTimeout(() => subscribe.next('🔴 Two 2 (1500)'), 1500);
    setTimeout(() => subscribe.next('🔴 Two 3 (1501)'), 1501);
});

observable$
    .pipe(
        audit(() => {
            return interval(200)
                .pipe(
                    tap(() => console.log('🧨 Resolve', Date.now() - startTime))
                )

            // Same implementation but using Promise

            // return new Promise(resolve => {
            //     setTimeout(() => {
            //         console.log('🧨 Resolve', Date.now() - startTime)
            //         resolve()
            //     }, 200)
            // });
        })
    )
    .subscribe(
        value => console.log("✔️ Value", value),
        () => console.log('Error'),
        () => console.log('✅ Completed!')
    );

