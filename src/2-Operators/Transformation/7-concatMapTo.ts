import { Observable } from 'rxjs';
import { concatMapTo, tap } from 'rxjs/operators';

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 (1000)'), 1000);
    setTimeout(() => subscribe.next('🟢 (3000)'), 3000);
    setTimeout(() => subscribe.next('🟢 (4000)'), 4000);
});

observable$
    .pipe(
        tap((value)=>{
            console.log("VAL",value);
            return value;
        }),
        concatMapTo(
            new Observable(subscriber => {
                let iteration = 0;
                const intervalID = setInterval(()=>{
                    iteration ++;
                    subscriber.next("Hello world");

                    /**
                     * next() function will be triggered two times
                     * for each "observable$" value emit
                     */
                    if(iteration === 2) {
                        subscriber.complete()
                    }
                },500);

                return () => {
                    clearInterval(intervalID)
                }
            }))
    )
    .subscribe(
        value => console.log("✔️ Value:", value),
        () => console.log('🆘 Error'),
        () => console.log('✅ Completed!')
    );

