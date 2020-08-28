import { fromEventPattern } from "rxjs";

const button2 = document.getElementById('rxjs-fromEventPattern-button-id');

function addClickHandler(handler) {
	console.log('Add')
	button2.addEventListener('click', handler);
	return 'some token'
}

function removeClickHandler(handler) {
	console.log('Remove')
	button2.removeEventListener('click', handler);
}

const clicks = fromEventPattern(
	addClickHandler,
	removeClickHandler
);

clicks.subscribe(event => {

	console.log('EVENT', event);
	return 'hello'
});
