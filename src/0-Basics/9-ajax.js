const {ajax} = require("rxjs/ajax");

// Solves CORS issue in Node
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

ajax({
	url: 'https://jsonplaceholder.typicode.com/posts',
	method: 'GET',
	// ! Solves CORS issue
	crossDomain: true,
	// ! Solves CORS issue
	createXHR: () => {
		return new XMLHttpRequest();
	}
})
	.subscribe(response => {
		console.log(response.response);
	});


