import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

interface Props {
    id: number;
    profile: {
        name: string;
        email: string;
    }
}

const observable$ = new Observable<Props>(subscribe => {
    setTimeout(() => subscribe.next({
        id: 1,
        profile: {
            email: 'some_1@gmail.com',
            name: 'SomeName-1'
        }
    }), 500);
    setTimeout(() => {
        subscribe.next({
            id: 1,
            profile: {
                email: 'some_2@gmail.com',
                name: 'SomeName-2'
            }
        });
        subscribe.complete();
    }, 1000);
});

observable$
    .pipe(
        pluck("profile", "name")
    )
    .subscribe(value => console.log("✔️ Value: ", value),
        error => console.log('ERROR'),
        () => console.log('✅ Completed'));
