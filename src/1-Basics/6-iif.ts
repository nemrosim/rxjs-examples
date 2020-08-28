import { iif } from 'rxjs';

let shouldSubscribeToFirst: boolean;

const firstOrSecond$ = iif(
    () => shouldSubscribeToFirst,
    new Promise((resolve) => {
        setTimeout(() => {
            resolve('✅ FIRST')
        }, 1000)
    }),
    new Promise((resolve) => {
        setTimeout(() => {
            resolve("✅ SECOND")
        }, 1000)
    }),
);

shouldSubscribeToFirst = true;
firstOrSecond$.subscribe(value => console.log("Selecting first : ",value));

shouldSubscribeToFirst = false;
firstOrSecond$.subscribe(value => console.log("Selecting second: ", value));

