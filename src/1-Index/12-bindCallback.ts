import { bindCallback } from 'rxjs';

const someCallbackFunction = (
    a: number,
    b: number,
    callback: (result: number) => number
): void => {

    if (a < 0) {
        throw Error('"a" < 0');
    }

    setTimeout(() => {
        callback(a + b);
    }, 1000)

}

const bound = bindCallback<number, number>(someCallbackFunction);

const result$ = bound(-100, 200);

result$.subscribe(x => console.log('Result', x), e => console.log('Error:', e.message));
