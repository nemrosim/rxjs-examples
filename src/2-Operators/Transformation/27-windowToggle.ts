import { Observable } from 'rxjs';
import { mergeAll, windowToggle } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 50);
    setTimeout(() => subscribe.next('🟢 Two'), 700);
    setTimeout(() => subscribe.next('🟢 Three'), 900);
    setTimeout(() => {
        subscribe.next('🟢 Four');
        subscribe.complete();
    }, 1950);
});

/**
 * Open a "window" for receiving data after 500ms
 */
const openings = new Observable<boolean>(subscriber => {
    setTimeout(() => subscriber.next(true), 500);
})

/**
 * Close a "window" for receiving data after 1 second
 */
const closing = () => new Observable<boolean>(subscriber => {
    setTimeout(() => subscriber.next(true), 1000);
})

observable$
    .pipe(
        /**
         * windowTimeSpan: "open" 500ms < - > 1000ms "close".
         * ["two" (700ms), "three" (900ms)]
         */
        windowToggle(openings, closing),
        mergeAll(),
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
