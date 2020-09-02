import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

const observable_2$ = (value: string) => new Observable<string>(subscribe => {
    console.log('🔴 User clicked on a button: ', value);
    console.log('⏳ === Loading some data ===')
    setTimeout(() => {
        subscribe.next(`🟢 Data loaded after click ${value}`);
        subscribe.complete();
    }, 2000);
});

observable$
    .pipe(
        switchMap((value) => observable_2$(value))
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
