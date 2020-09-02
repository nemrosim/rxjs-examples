import { Observable } from 'rxjs';
import { groupBy, mergeMap, reduce, tap } from 'rxjs/operators';

/*
         Example 1
 */
interface ValueProps {
    id: string;
    name: string
}

const observable$ = new Observable<ValueProps>(subscribe => {
    setTimeout(() => subscribe.next({id: '1', name: 'name-1'}), 500);
    setTimeout(() => subscribe.next({id: '2', name: 'name-2'}), 1000);
    setTimeout(() => subscribe.next({id: '1', name: 'name-3'}), 1200);
    setTimeout(() => {
        subscribe.next({id: '2', name: 'name-4'});
        /**
         * !! Don't forget to add complete() function.
         * Else - result will be empty
         */
        subscribe.complete();
    }, 1400);
})


observable$
    .pipe(
        groupBy((value) => value.id),
        mergeMap((group$) => group$
            .pipe(
                reduce((acc: Array<ValueProps>, current: ValueProps): Array<ValueProps> => {
                    return [...acc, current];
                }, [])
            )
        ),
    )
    .subscribe(value => console.log("✔️ Value: ", value),
        error => console.log('ERROR'),
        () => console.log('✅ Completed'));

/*
    Example 2
 */

const observable_2$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('value-1'), 500);
    setTimeout(() => subscribe.next('result-1'), 1000);
    setTimeout(() => subscribe.next('value-2'), 1200);
    setTimeout(() => {
        subscribe.next('result-2');
        /**
         * !! Don't forget to add complete() function.
         * Else - result will be empty
         */
        subscribe.complete();
    }, 1400);
});

observable_2$
    .pipe(
        groupBy((value) => value.includes('value')),
        mergeMap((group$) => group$
            .pipe(
                reduce((acc: Array<string>, current: string): Array<string> => {
                    return [...acc, current];
                }, [])
            )
        ),
    )
    .subscribe(value => console.log("✔️ Value: ", value),
        error => console.log('ERROR'),
        () => console.log('✅ Completed'));

