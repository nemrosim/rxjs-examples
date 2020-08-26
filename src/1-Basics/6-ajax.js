const {ajax} = require('rxjs/ajax');

// Solves CORS issue in Node
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


ajax({
    url: 'http://worldclockapi.com/api/json/est/now',
    method: 'GET',
    // ! Solves CORS issue
    crossDomain: true,
    // ! Solves CORS issue
    createXHR: function () {
        return new XMLHttpRequest();
    }
})
    .subscribe(response => {
        console.log(response.response);
    });


