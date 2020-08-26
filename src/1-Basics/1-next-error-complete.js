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

