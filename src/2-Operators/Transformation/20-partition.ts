//                            DEPRECATED
// import {partition} from 'rxjs/operators';
//                Use this instead
//                      |
//                      V
import { Observable, partition } from 'rxjs';

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 First part -1'), 500);
    setTimeout(() => subscribe.next('🟢 Second part -1'), 1000);
    setTimeout(() => subscribe.next('🟢 First part -2'), 1500);
    setTimeout(() => {
        subscribe.next('🟢 Second part -2');
        subscribe.complete();
    }, 2000);
});

const [firstPart, secondPart] = partition(
    observable$,
    res => res.includes('First')
);

firstPart.subscribe(
    value => console.log("✔️ Value:", value),
    () => console.log('🆘 Error:'),
    () => console.log('✅ First part. Completed')
);

secondPart.subscribe(
    value => console.log("✔️ Value:", value),
    () => console.log('🆘 Error:'),
    () => console.log('✅ Second part. Completed')
);
