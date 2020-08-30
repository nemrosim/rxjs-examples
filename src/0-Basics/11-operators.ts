import { of } from "rxjs";
import { filter, map, tap } from "rxjs/operators";


of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .pipe(
        map(value => value * 2),
        filter(value => value > 5 && value < 100),
        tap(value => value * 2) // will do nothing
    )
    .subscribe(val => console.log(val));

