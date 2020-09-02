import { Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 400);
    setTimeout(() => subscribe.next('🟢 Two'), 600);
    setTimeout(() => subscribe.next('🟢 Three'), 700);
    setTimeout(() => {
        subscribe.next('🟢 Four');
    }, 1000);
});

const observable_2$ = new Observable<string>(subscribe => {
    console.log('🔴 User clicked on a button');
    console.log('⏳ === Loading some data ===')
    setTimeout(() => {
        subscribe.next('🟢 Data loaded after click');
        subscribe.complete();
    }, 2000);
});

observable$
    .pipe(
        switchMapTo(observable_2$)
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
