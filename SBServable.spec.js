const expect = require('chai').expect;
const sinon = require('sinon');

const Observable = require('./SBServable');

describe('Observable', () => {

    describe('create', () => {
        it('should be called a few times', () => {
            const obs = Observable.create(observer => {
                observer.onNext('This');
                observer.onNext('is');
                observer.onNext('cool!');
                observer.onCompleted();
            });

            const spy = sinon.spy();
            
            obs.subscribe(spy);

            expect(spy.callCount).to.equal(3); 

        })

    });

    describe('just', () => {

        it('should return just Hi', (done) => {
            const stream = Observable.just('Hi');

            stream.subscribe(result => {
                expect(result).to.equal('Hi');
                done();
            });

        })
    });

});
