import { Observable, Subscriber } from 'rxjs';
import { TeardownLogic } from "rxjs/src/internal/types";

const subscribe = (subscriber: Subscriber<string>): TeardownLogic => {

   const intervalID = setInterval(() => {
      console.log('✔️ Interval. Print something...')
   }, 500);

   ['One', 'Two', 'Three'].forEach(value => {

      subscriber.next(value + '_NEXT');

      if (value === 'This error will not be thrown') {
         subscriber.error('🆘 Some error');
      }
   })

   setTimeout(() => {
      console.log('🟢 Triggering complete() function')
      subscriber.complete();
   }, 2_000);

   /**
    * What should be done on "clean-up" (after complete() function)
    */
   return () => {
      clearInterval(intervalID);
      console.log('🧹 Cleaned');
   }
}

/**
 * "$" sign is a RxJS convention that it stores an Observable
 */
const myOwnObservable$ = new Observable(subscribe);

myOwnObservable$.subscribe(
   (value) => console.log(value),
   (error) => console.log('Error:', error), // optional
   () => console.log('✅ Subscriber.completed 2'), // optional
);


