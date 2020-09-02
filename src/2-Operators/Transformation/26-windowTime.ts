import { Observable } from 'rxjs';
import { map, mergeAll, skip, windowTime } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 50);
    setTimeout(() => subscribe.next('🟢 Two'), 950);
    setTimeout(() => subscribe.next('🟢 Three'), 1050);
    setTimeout(() => {
        subscribe.next('🟢 Four');
        subscribe.complete();
    }, 1950);
});

observable$
    .pipe(
        /**
         * windowTimeSpan -> 1 second.
         * [one (50ms), two (950ms)],
         * [three (1050ms), four (1950ms)],
         */
        windowTime(1000),
        /**
         * Skip first value from each window result (OperatorFunction/Observable)
         */
        map((win) => win.pipe(skip(1))),
        mergeAll(),
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
