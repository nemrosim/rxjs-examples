import { Observable } from 'rxjs';
import { pairwise } from 'rxjs/operators';

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
        pairwise()
    )
    .subscribe(value => console.log("✔️ Value:", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
