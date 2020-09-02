import { Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

/**
 * User clicks imitation
 */
const observable$ = new Observable<any>(subscribe => {
    setTimeout(() => subscribe.next('clicked-1'));
    setTimeout(() => subscribe.next('clicked-2'), 1000);
    setTimeout(() => subscribe.next('clicked-3'), 1500);
    setTimeout(() => {
        subscribe.next('clicked-4');
        subscribe.complete();
    }, 2000);
});

/**
 * Load some data on each user's click on a button
 */
const observable_2$ = (value: number) => new Observable<string>(subscribe => {
    console.log('🔴 User clicked on a button: ', value);
    console.log('⏳ === Loading some data ===')
    setTimeout(() => {
        subscribe.next(`🟢 Data loaded after click ${value}`);
        subscribe.complete();
    }, 2000);
});

observable$
    .pipe(
        map((clicked)=>{
            return observable_2$(clicked)
        })
    )
    .pipe(mergeAll())
    .subscribe(value => console.log("✔️ Value: ", value),
        error => console.log('🆘 Error:', error),
        () => console.log('✅ Completed'));
