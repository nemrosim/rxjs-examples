import { fromEvent } from "rxjs";

const button = document.getElementById('rxjs-button-id');

fromEvent(button, 'click')
	.subscribe(() => {

		const someDiv = document.getElementById('some-div-id');

		someDiv.innerHTML += 'Hello world!' + '<br>';
	});

