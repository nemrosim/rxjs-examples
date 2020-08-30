import { fromEvent, interval } from 'rxjs';
import { audit } from 'rxjs/operators'

const button = document.getElementById('rxjs-audit-button-id');

fromEvent(button, 'click')
	.pipe(
		audit(ev => interval(1000))
	)
	.subscribe(x => console.log(x));

