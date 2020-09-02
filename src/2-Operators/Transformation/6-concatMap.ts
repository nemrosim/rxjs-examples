import { interval, Observable } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 (200)'), 200);
    setTimeout(() => subscribe.next('🟢 (300)'), 300);
    setTimeout(() => subscribe.next('🟢 (600)'), 600);
});

observable$
    .pipe(
        concatMap(value => {
            return interval(500).pipe(
                take(2),
                map(intervalValue => {
                    return `${value} => ${intervalValue}`
                }));
        })
    )
    .subscribe(
        value => console.log("✔️ Value:", value),
        () => console.log('🆘 Error'),
        () => console.log('✅ Completed!')
    );

