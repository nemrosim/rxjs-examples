import { Observable } from 'rxjs';
import { map, mergeAll, take, windowWhen } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 50);
    setTimeout(() => subscribe.next('🟢 Two'), 700);
    setTimeout(() => subscribe.next('🟢 Three'), 1200);
    setTimeout(() => {
        subscribe.next('🟢 Four');
        subscribe.complete();
    }, 1950);
});

/**
 * Close date receive "window" after every 1000ms
 */
const closingSelector = () => new Observable<boolean>(subscriber => {
    setTimeout(() => subscriber.next(true), 1000);
});

observable$
    .pipe(
        /**
         * windowTimeSpan: close "window" after 1000ms.
         * [ "one" (50ms), "two" (700ms) ],
         * [ "three" (1200ms), "four" (1950ms) ]
         */
        windowWhen(closingSelector),
        /**
         * Use only first element:
         * [ "one" (50ms), !skipThisElement! ],
         * [ "three" (1200ms), !skipThisElement! ]
         */
        map(win => win.pipe(take(1))),
        mergeAll(),
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
