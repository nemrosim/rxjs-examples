import { Observable } from 'rxjs';
import { map, mergeAll, skip, windowCount } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 500);
    setTimeout(() => subscribe.next('🟢 Two'), 1000);
    setTimeout(() => subscribe.next('🟢 Three'), 1500);
    setTimeout(() => {
        subscribe.next('🟢 Four');
        subscribe.complete();
    }, 2000);
});

observable$
    .pipe(
        windowCount(2),
        /**
         * Skip first value from each window result (OperatorFunction/Observable)
         */
        map((win) => win.pipe(skip(1))),
        mergeAll(),
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
