import { from } from 'rxjs';

const array = [1, 2, 'three', true];

from(array)
	.subscribe((val: any) => console.log(val));
