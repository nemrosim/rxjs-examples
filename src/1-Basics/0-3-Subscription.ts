import { Observable } from 'rxjs';
import { PartialObserver } from "rxjs/src/internal/types";

const timer$ = new Observable<number>(subscriber => {

   let iteration = 0;
   const intervalId = setInterval(() => {
      if (iteration === 10) {
         subscriber.unsubscribe();
      }
      subscriber.next(iteration++);
   }, 500);

   return () => {
      clearInterval(intervalId);
      console.log('🧹 Cleaned');
   }
});

const observer = {
   next: (val) => console.log(val),
   error: (error) => console.log("Error to console:", error),
   complete: () => console.log('✅ Completed'),
} as PartialObserver<number>

timer$.subscribe(observer)
