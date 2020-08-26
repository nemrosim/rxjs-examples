const {Observable} = require('rxjs');

/*
    class Subscriber<T> extends Subscription implements Observer<T>
*/
const subscribe = (subscriber) => {

    // Print something every second
    const intervalID = setInterval(() => {
        console.log('🟢 Interval. Print something...')
    }, 1_000);

    ['One', 'Two', 'Three'].forEach(element => {
        subscriber.next(element);
        if (element === 'No errors') {
            subscriber.error('🆘 Some error');
        }
    })

    setTimeout(() => {
        console.log('✅ Subscriber.completed')
        subscriber.complete();
    }, 2_000);

    /**
     * This is like "useEffect" hook in React
     * What should be done on "clean-up" (after completed, for example)
     */
    return () => {
        clearInterval(intervalID);
        console.log('🧹 Cleaned');
    }
}

/**
 * "$" sign is a RxJS convention that it stores an Observable
 */
new Observable(subscribe).subscribe(some => console.log(some));

/**
 * Same implementation, but...
 * ! create() function is deprecated
 */
//Observable.create(subscribe).subscribe(some => console.log(some));

