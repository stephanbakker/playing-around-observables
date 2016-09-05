const Observable = require('rxjs').Observable;

Observable
    .just(42)
    .subscribe(x => console.log(x), err => console.log(err), () => console.log('complete'));




