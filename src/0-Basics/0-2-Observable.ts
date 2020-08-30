import { Observable } from 'rxjs';
import { PartialObserver } from "rxjs/src/internal/types";

/**
 * "$" sign is a RxJS convention that it stores an Observable
 */
const observable$ = new Observable<string>(subscriber => {
   subscriber.next('One');
   subscriber.next('Two');
   subscriber.next('Three');
   setTimeout(() => {
      subscriber.next('Four');
      subscriber.complete();
   }, 2000);
   setTimeout(() => {
      subscriber.error('🆘 Some error');
   }, 1000);
});

const observer = {
   next: (val) => console.log(val),
   error: (error) => console.log("Error to console:", error),
   complete: () => console.log('✅ Completed'),
} as PartialObserver<string>

observable$.subscribe(observer)
