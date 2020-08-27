import { from } from 'rxjs';
import { PartialObserver } from "rxjs/src/internal/types";

const array = ['One', 'Two', 'Three'];

const Observer = {
	next: (val) => console.log(val),
	error: undefined,
	complete: undefined,
} as PartialObserver<string>

/**
 * Result will be exactly the same
 */
from(array)
	.subscribe(Observer);

