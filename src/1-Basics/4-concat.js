const {concat, from} = require('rxjs');

const array1 = [
    {
        id: 1,
        name: 'One'
    },
    {
        id: 2,
        name: 'Two'
    },
];

const array2 = [
    {
        id: 3,
        name: 'Three'
    },
    {
        id: 4,
        name: 'Four'
    }
];

const source1$ = from(array1)
const source2$ = from(array2)

concat(source1$, source2$)
    .subscribe(val => console.log(val));

