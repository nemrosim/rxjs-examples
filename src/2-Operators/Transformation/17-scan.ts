import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

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
        scan((acc, currentValue) => acc + currentValue, 'seed ')
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
