import { concat, from } from "rxjs";

const array_1 = ['ONE', 'TWO', 'THREE'];

const array_2 = ['FOUR', 'FIVE', 'SIX'];

const observable_1$ = from(array_1);
const observable_2$ = from(array_2);

concat(observable_1$, observable_2$)
    .subscribe(val => console.log(val));

