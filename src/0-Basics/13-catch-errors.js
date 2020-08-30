const {of} = require('rxjs');
const {ajax} = require('rxjs/ajax');
const {mergeMap, filter, catchError, throwError} = require('rxjs/operators');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

ajax({
	url: "http://worldtimeapi.org/api/timezone",
	method: 'GET',
	crossDomain: true,
	createXHR: function () {
		return new XMLHttpRequest();
	}
}).pipe(
	mergeMap(response => response.response),
	filter(timezone => {
		if (timezone === 'Europe/Madrid') {
			throw new Error('Error custom message')
		} else {
			return timezone.includes('Europe')
		}
	}),
	// it must be placed in the end of a pipe
	// "caught" -> Observable that produced the error
	catchError((error, caught) => {
		console.log("🆘 Error!", error.message)

		/**
		 * We can return a new Observable
		 */
		return of('🤬🧨😡 Some weird Error')
	}),
	// "throwError" -> returns error as Observable
	catchError(err => throwError('some message')),
)
	.subscribe(timezone => console.log("✔️", timezone),
		error => console.log('Error'),
		complete => console.log('✅ Completed')
	)


