const {of} = require('rxjs');

of('hello', 'world', true, 333)
    .subscribe(val => console.log(val));

