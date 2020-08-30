const {ajax} = require('rxjs/ajax');
const {mergeMap, filter, tap} = require('rxjs/operators');

// Solves CORS issue in Node
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

ajax({
    url: "http://worldtimeapi.org/api/timezone",
    method: 'GET',
    // ! Solves CORS issue
    crossDomain: true,
    // ! Solves CORS issue
    createXHR: function () {
        return new XMLHttpRequest();
    }
}).pipe(
    mergeMap(res=>res.response),
    filter(res=>res.includes('Europe')),
    tap(res=>res) // additional action, like log
)
    .subscribe(result => {
        console.log(result);
    })


