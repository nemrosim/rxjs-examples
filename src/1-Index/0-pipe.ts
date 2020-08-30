import { of } from "rxjs";
import { filter, map } from "rxjs/operators";

of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .pipe(
        map(value => value * 10),
        filter(value => value > 40 && value < 90),
    )
    .subscribe(
        val => console.log(val),
        error => console.log(error),
        () => console.log('✅ Completed!')
    );

