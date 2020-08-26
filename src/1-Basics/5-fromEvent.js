const {fromEvent} = require('rxjs');

const button = document.getElementById('some-button-id')

fromEvent(button, 'click')
    .subscribe(event => {

        const someDiv = document.getElementById('some-div-id');

        someDiv.innerHTML += 'hello world' + '<br>';
    });

