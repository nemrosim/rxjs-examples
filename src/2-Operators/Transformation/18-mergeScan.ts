import { Observable, of } from 'rxjs';
import { map, mergeScan } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'));
    setTimeout(() => subscribe.next('🟢 Two'), 1000);
    setTimeout(() => subscribe.next('🟢 Three'), 1500);
    setTimeout(() => {
        subscribe.next('🟢 Four');
        subscribe.complete();
    }, 2000);
});

observable$
    .pipe(
        mergeScan((acc, currentValue) => {
            return of(acc + currentValue)
                .pipe(
                    map(value => value + '❗️Mapped')
                );
        }, 'seed ')
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
