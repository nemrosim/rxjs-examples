import { Observable } from 'rxjs';
import { map, mergeAll, window } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 400);
    setTimeout(() => subscribe.next('🟢 Two'), 600);
    setTimeout(() => subscribe.next('🟢 Three'), 700);
    setTimeout(() => {
        subscribe.next('🟢 Four');
        subscribe.complete();
    }, 1000);
});

const observable_2$ = new Observable<string>(subscribe => {
    console.log('🔴 User clicked on a button');
    console.log('⏳ === Loading some data ===')
    setTimeout(() => {
        subscribe.next('🟢 Data loaded after click');
        // with complete() result will not be returned
        // subscribe.complete();
    }, 200);
});

observable$
    .pipe(
        window(observable_2$),
        map(win => win.pipe(
            map(value => value + "❗️Mapped")
        )),
        mergeAll(),
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
