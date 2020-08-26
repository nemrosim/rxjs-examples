## Example-1 (next/error/complete)
```javascript
const {Observable} = require('rxjs');

const someArray = [
    {
        id: 1,
        name: 'One'
    },
    {
        id: 2,
        name: 'Two'
    },
    {
        id: 3,
        name: 'Three'
    },
    {
        id: 4,
        name: 'Four'
    }
];

const subscribe = (subscriber) => {
    // Variant 1
    // for (let book of someArray){
    //     subscriber.next(book);
    // }

    const intervalID = setInterval(() => {
        console.log('Interval. Print something...')
    }, [1000]);

    // Variant 2
    someArray.forEach(element => {
        subscriber.next(element);
        if (element.id === 5) {
            subscriber.error('some error');
        }
    })

    setTimeout(() => {
        console.log('Timeout. Subscriber.complete()')
        subscriber.complete();
    }, [2000]);

    /**
     * This is like "useEffect" hook in React
     * What should be done on "clean-up" (after completed, for example)
     */
    return () => {
        clearInterval(intervalID);
        console.log('Return function. Done!');
    }
}

/**
 * "$" sign is a RxJS convention that it stores an Observable
 */
new Observable(subscribe).subscribe(some => console.log(some));

/**
 * Same implementation, but...
 * !!!!create() function is deprecated
 */
Observable.create(subscribe).subscribe(some => console.log(some));
```
![](rx-examples/images/1-next-error-complete.jpg)

---
## Example-2 (of)
```javascript
const {of} = require('rxjs');

of('hello', 'world', true, 333)
    .subscribe(val => console.log(val));
```
![](rx-examples/images/2-of.jpg)

---
## Example-3 (from)
```javascript
const {from} = require('rxjs');

const someArray = [
    {
        id: 1,
        name: 'One'
    },
    {
        id: 2,
        name: 'Two'
    },
    {
        id: 3,
        name: 'Three'
    },
    {
        id: 4,
        name: 'Four'
    }
];

from(someArray)
    .subscribe(val => console.log(val));

```
![](rx-examples/images/3-from.jpg)

---
## Example-4 (concat)
```javascript
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

```
![](rx-examples/images/4-concat.jpg)

---
## Example-5 (from Event)
```javascript
const {fromEvent} = require('rxjs');

const button = document.getElementById('some-button-id')

fromEvent(button, 'click')
    .subscribe(event => {

        const someDiv = document.getElementById('some-div-id');

        someDiv.innerHTML += 'hello world' + '<br>';
    });
```
![](rx-examples/images/6-ajax.jpg)

---
## Example-6 (ajax request)
```javascript
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
```

![](rx-examples/images/6-ajax.jpg)

---
## Example-7 (own Observers)
```javascript
const {of} = require('rxjs');

/**
 * To create your own Observer
 * you need to implement three functions:
 * - next
 * - error
 * - complete
 * @type {{}}
 */
const ownObserver = {
    next: (val) => console.log('Some value:', val),
    error: (val) => console.log('Error:', val),
    complete: () => console.log('All done'),
};

of(1, 2, 3, 4, 5).subscribe(ownObserver);

// OR the same

of(1, 2, 3, 4, 5).subscribe(
    null, // optional. Can be NULL
    (error) => console.log('Error:', error), // optional
    () => console.log('Second version is done')  // optional
);
```
![](rx-examples/images/7-ownObserver.jpg)

---
## Example-8 (multiple Observers)
```javascript
const {Observable} = require('rxjs');

const currentTime$ = new Observable((subscriber) => {
    const time = new Date().toLocaleTimeString();
    subscriber.next(time);
    subscriber.complete();
})

const sameFunctionCall = () => {
    currentTime$.subscribe(
        currentTime => console.log(`Current time is: ${currentTime}`)
    );
}

/**
 * Call first time
 */
sameFunctionCall();

/**
 * Call second time after 1 second
 */
setTimeout(() => {
    sameFunctionCall();
}, [1000])

/**
 * Call third time after 2 second
 */
setTimeout(() => {
    sameFunctionCall();
}, [2000])

```
![](rx-examples/images/8-multipleObservers.jpg)

---
## Example-9 (unsubscribe)
```javascript
const moment = require('moment');
const {interval} = require('rxjs');

let date = 819151255000;

const source = interval(1000).subscribe(val => {
        date += 1000
        const res = moment(new Date(date));
        console.log(res.format('HH:mm:ss'))

        if (val === 5) {
            source.unsubscribe();
        }
    },
    null, // error handler is NULL
    () => console.log("Timer is done")
);
```

---
## Example-10 (Add function + own interval implementation)
```javascript
const timerOne = timer$(1000).subscribe(
// some code
);

const timerTwo = timer$(1000).subscribe(
// some code
);

// !!! Result with this line commented
// timerOne.add(timerTwo) 
```
![](rx-examples/images/10-own-interval(commented).jpg)
```javascript
const timerOne = timer$(1000).subscribe(
// some code
);

const timerTwo = timer$(1000).subscribe(
// some code
);

timerOne.add(timerTwo)  // <---- with add function !!!!
```
![](rx-examples/images/10-own-interval(with%20add).jpg)

---
## Example-11 (operators)

Categories of operators:
- Transformation;
- Filtering;
- Combination;
- Utility;
- Conditional;
- Aggregate;
- Multicasting;

Marble Diagram: https://rxmarbles.com/#combineLatest

```javascript
const {of} = require('rxjs');
const {map, filter} = require('rxjs/operators');

of(1, 2, 3, 4, 5, 6).pipe(
    map(value => value * 2),
    filter(value => value > 5)
).subscribe(val => console.log(val));
```
![](rx-examples/images/11-operators.jpg)

---
## Example-12 (mergeMap/tap operators)
```javascript
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
```
![](rx-examples/images/12-merge-map.gif)

---
## Example-13 (catch errors)
```javascript
const {of} = require('rxjs');
const {ajax} = require('rxjs/ajax');
const {mergeMap, filter, catchError} = require('rxjs/operators');
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
    catchError((error) => {
        console.log("🆘 Error!", error.message)

        /**
         * We can return a new Observable
         */
        return of('🤬🧨😡 Some weird Error')
    })
)
    .subscribe(timezone => console.log("✔️", timezone),
        error => console.log('Error'),
        complete => console.log('✅ Completed')
    )
```
![](rx-examples/images/13-catch-errors.gif)
