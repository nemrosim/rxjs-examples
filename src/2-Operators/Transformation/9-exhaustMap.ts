import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

/**
 * Imitate user clicks
 */
const observable$ = new Observable<number>(subscribe => {
    setTimeout(() => subscribe.next(1000), 1000);
    setTimeout(() => subscribe.next(2000), 2000);
    setTimeout(() => subscribe.next(3000), 3000);
    setTimeout(() => subscribe.next(4000), 4000);
    setTimeout(() => subscribe.next(5000), 5000);
    setTimeout(() => subscribe.next(6000), 6000);
});

const observable_2$ = (value: number) => new Observable<string>(subscribe => {
    console.log('🟡 User clicked on a button', value);
    console.log('⏳ === Loading some data ===')
    setTimeout(() => {
        subscribe.next(`✅ Data loaded after click ${value}`);
        subscribe.complete();
    }, 2000);
    return () => {
        console.log('🧹 Cleaned data')
    }
});

observable$
    .pipe(
        exhaustMap((clickTime) => observable_2$(clickTime))
    )
    .subscribe(s => console.log(s));
