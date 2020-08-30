import { from } from "rxjs";

from(['ONE', 'TWO', 'THREE'])
   .subscribe(val => console.log(val));

