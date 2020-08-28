import { of } from "rxjs";

of('hello', 'world', true, 333)
   .subscribe((val: any) => console.log(val));

