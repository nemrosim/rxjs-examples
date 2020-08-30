import { range } from 'rxjs';

const numbers = range(1, 5);

numbers
    .subscribe(val => console.log(val));
