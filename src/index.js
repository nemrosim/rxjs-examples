import {fromEvent} from "rxjs";

const button = document.getElementById('rxjs-button-id');

fromEvent(button, 'click')
    .subscribe(event => {

        const someDiv = document.getElementById('some-div-id');

        someDiv.innerHTML += 'hello world' + '<br>';
    });
