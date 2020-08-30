import { forkJoin, of } from 'rxjs';

let ms_seconds = 0;

console.log(ms_seconds)
const intervalID = setInterval(() => {
    console.log(++ms_seconds)
}, 500)

const observable$ = forkJoin([
    of(11, 22, 33, 44),
    Promise.resolve(8),
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(100)
        }, 2000)
    }),
]);

observable$.subscribe({
    next: value => console.log(value),
    complete: () => {
        console.log('✅ Completed!');
        clearInterval(intervalID);
    },
});
