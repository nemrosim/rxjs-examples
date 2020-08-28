import { defer, from, interval, of } from 'rxjs';
import { delay, take } from "rxjs/operators";

const clicksOrInterval = (value: number) => defer(function () {
    switch (value) {
        case 1:
            return interval(1000).pipe(take(4))
        case 2:
            return of('Some value').pipe(delay(1000))
        case 3:
            return from([1, 2, 3, 4, 5])
    }
});

clicksOrInterval(3).subscribe(x => console.log(x));
