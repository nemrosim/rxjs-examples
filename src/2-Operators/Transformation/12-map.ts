import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 500);
    setTimeout(() => subscribe.next('🟢 Two'), 1000);
    setTimeout(() => subscribe.next('🟢 Three'), 1200);
    setTimeout(() => {
        subscribe.next('🟢 Four');
        /**
         * !! Without complete() function "Completed"
         * in Observer will not be triggered
         */
        subscribe.complete();
    }, 1400);
});

observable$
    .pipe(
        map((value) => `${value} + 🟡 mapped`),
    )
    .subscribe(value => console.log("✔️ Value: ", value),
        error => console.log('ERROR'),
        () => console.log('✅ Completed'));
