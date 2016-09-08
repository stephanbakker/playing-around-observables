
/**
 * Observable
 * @param {Observer} observer
 */
class Observable {
    constructor(observer) {
        this.observer = observer;
    }

    subscribe(cb) {
        while (this.observer.hasNext()) {
            cb(this.observer.next());
        }
    }

    map(mapFn) {
        this.observer._iterable.values = this.observer._iterable.values.map(mapFn);
        return this;
    }
}


/**
 * Observer
 * @param {Iterable} iterable
 */
class Observer {
    constructor(iterable) {
        this._iterable = iterable;
    }

    onNext(value) {
        this._iterable.add(value);
    }

    onCompleted() {
        // TODO 
    }

    next() {
        return this._iterable.next();
    }

    hasNext() {
        return this._iterable.hasNext();
    }
}

/**
 * Iterable thing
 */
class Iteriple {
    constructor() {
        this._cursor = 0;
        this._values = [];
    }

    get values() {
        return this._values;
    }

    set values(newValues) {
        this._values = newValues;
    }

    add(val) {
        this._values.push(val);
    }

    next() {
        if (this._cursor < this._values.length) {
            return this._values[this._cursor++];
        }
    }

    hasNext() {
        return this._cursor < this._values.length;
    }
}


// export some methods
module.exports = {

    create(producer) {
        const observer = new Observer(new Iteriple());
        
        // fill observer using provided producer
        producer.call(this, observer);

        return new Observable(observer);
    },

    just(values) {
        const observer = new Observer(new Iteriple());

        if (typeof values === 'string') {
            observer.onNext(values);
        } else {
            values.forEach(value => {
                observer.onNext(value);
            })
        }

        return new Observable(observer);
    }
}


