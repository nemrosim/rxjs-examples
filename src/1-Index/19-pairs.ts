import { pairs } from 'rxjs';

const someObject = {
    id: '123',
    name: 'John',
    email: 'google@gmail.com',
}

pairs(someObject)
    .subscribe(val => console.log(val));
