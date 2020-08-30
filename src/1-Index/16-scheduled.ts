import { asapScheduler, asyncScheduler, merge, queueScheduler, scheduled } from 'rxjs';

const async$ = scheduled(new Promise((resolve) => {
    setTimeout(() => {
        resolve("Async value")
    }, 1000)
}), asyncScheduler);

const queue$ = scheduled(new Promise((resolve) => {
    setTimeout(() => {
        resolve("Queue value")
    }, 3000)
}), queueScheduler);

const asap$ = scheduled(new Promise((resolve) => {
    setTimeout(() => {
        resolve("Asap value")
    }, 4000)
}), asapScheduler);

merge(async$, queue$, asap$)
    .subscribe(x => console.log(x));
