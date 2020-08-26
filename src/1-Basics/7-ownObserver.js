const {of} = require('rxjs');

/**
 * To create your own Observer
 * you need to implement three functions:
 * - next
 * - error
 * - complete
 * @type {{}}
 */
const ownObserver = {
    next: (val) => console.log('Some value:', val),
    error: (val) => console.log('Error:', val),
    complete: () => console.log('All done'),
};

of(1, 2, 3, 4, 5).subscribe(ownObserver);

// OR the same

of(1, 2, 3, 4, 5).subscribe(
    null, // optional. Can be NULL
    (error) => console.log('Error:', error), // optional
    () => console.log('Second version is done')  // optional
);



