import { Observable, partition } from 'rxjs';

const observable$ = new Observable<string>(subscribe => {
    setTimeout(() => subscribe.next('🟢 One'), 500)
    setTimeout(() => subscribe.next('🟢 One_1'), 1500)
    setTimeout(() => subscribe.next('🟢 One_2'), 2500)
    setTimeout(() => subscribe.next('🔴 Two'), 1000)
    setTimeout(() => subscribe.next('🔴 Two_1'), 2000)
    setTimeout(() => subscribe.next('🔴 Two_2'), 3000)
});

const [obs_1$, obs_2$] = partition(observable$, (value: string) => value.includes('One'));

obs_1$.subscribe(value => console.log("Obs_1 :", value));
obs_2$.subscribe(value => console.log("Obs_2 :", value));
