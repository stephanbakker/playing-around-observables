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
            expect(spy.calledWith('This')).to.be.true;
            expect(spy.calledWith('is')).to.be.true;
            expect(spy.calledWith('cool!')).to.be.true;

        })

    });

    describe('Observer map', (done) => {

        it('should map the input', (done) => {
            const obs = Observable.create(observer => {
                observer.onNext('can');
                observer.onNext('be');
                observer.onNext('mapped');

                observer.onCompleted();
            });

            const obsResults = [];
            obs
                .map(val => val += ' yo')
                .subscribe(result => {

                    obsResults.push(result);

                    // shortcut for now, change after onCompleted is implemented
                    if (obsResults.length === 3) {
                        expect(obsResults).to.deep.equal(['can yo', 'be yo', 'mapped yo']);
                        done()
                    }
                });

        });
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
