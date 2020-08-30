import { generate } from 'rxjs';

const generatedNumbers$ = generate(1, x => x <= 3, x => x + 1);

generatedNumbers$
    .subscribe(x => console.log(x));
