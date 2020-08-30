import { bindNodeCallback } from 'rxjs';

const someCallbackFunction = (
    a: number,
    b: number,
    callback: (error?: string, result?: number) => number
): void => {

    if (a < 0) {
        callback('Property "a" is less than zero', undefined);
    }

    if (b < 0) {
        callback('Property "b" is less than zero', undefined);
    }

    setTimeout(() => {
        callback(undefined, a + b);
    }, 1000)

}

const bound = bindNodeCallback<number, number>(someCallbackFunction);

const result$ = bound(-100, 200);

result$
    .subscribe(
        x => console.log('✅ Result:', x),
        e => console.log('🆘 Error:', e)
    );
