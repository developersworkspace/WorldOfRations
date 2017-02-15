// Imports
import proxyquire = require('proxyquire');
import 'mocha';
import { expect } from 'chai';

// Imports services
import { FeedstuffRepository } from './../../../../../api/src/core/repositories/mysql/feedstuff';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../../../../../api/src/core/models/feedstuff';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../../../../../api/src/core/models/feedstuff-measurement';
import { SuggestedValue as DomainSuggestedValue } from './../../../../../api/src/core/models/suggested-value';

describe('FeedstuffRepository', () => {

    let feedstuffRepository: FeedstuffRepository = null;

    let existingFeedstuffId = '36995DEF-9B6B-49CD-9AA6-0165478BA4CD';
    let nonExistingFeedstuffId = '078567E3-A67E-4737-B273-4AE381FDBACD';
    let existingFormulaIdWithSuggestedValue = 'CB0360F3-4617-4922-B20D-C3F223BBBCEB';
    let existingFeedstuffIdWithSuggestedValue = 'B3EDBFD3-CB3C-4427-A6FB-B20EBF4FC831';
    let nonExistingFormulaId = '3DE8F48A-CC7A-4217-B317-979866B42BB6';

    beforeEach(function (done: Function) {

        feedstuffRepository = new FeedstuffRepository({
            server: '127.0.0.1',
            user: 'worldofrations_user',
            password: 'worldofrations_password',
            database: 'worldofrations'
        });
        done();
    });

    describe('listFeedstuffs', () => {
        it('should return list of 264 feedstuffs', (done) => {
            feedstuffRepository.listFeedstuffs().then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(264);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
        it('should return list of feedstuffs as correct object', (done) => {
            feedstuffRepository.listFeedstuffs().then((result: DomainFeedstuff[]) => {
                let item = result[0];

                expect(item.cost).to.be.null;
                expect(item.elements).to.be.not.null;
                expect(item.elements.length).to.be.eq(0);
                expect(item.id).to.be.not.null;
                expect(item.name).to.be.not.null;
                expect(item.maximum).to.be.null;
                expect(item.minimum).to.be.null;
                expect(item.weight).to.be.null;

                expect(Object.keys(item).length).to.be.eq(7);

                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
    });


    describe('listExampleFeedstuffs', () => {
        it('should return list of 13 feedstuffs', (done) => {
            feedstuffRepository.listExampleFeedstuffs().then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(13);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
        it('should return list of feedstuffs as correct object', (done) => {
            feedstuffRepository.listExampleFeedstuffs().then((result: DomainFeedstuff[]) => {
                let item = result[0];

                expect(item.cost).to.be.not.null;
                expect(item.elements).to.be.not.null;
                expect(item.elements.length).to.be.eq(0);
                expect(item.id).to.be.not.null;
                expect(item.name).to.be.not.null;
                expect(item.maximum).to.be.not.null;
                expect(item.minimum).to.be.not.null;
                expect(item.weight).to.be.null;

                expect(Object.keys(item).length).to.be.eq(7);

                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
    });

    describe('getFeedstuffById', () => {
        it('should return feedstuff given existing feedstuff id', (done) => {
            feedstuffRepository.getFeedstuffById(existingFeedstuffId).then((result: DomainFeedstuff) => {
                expect(result).to.be.not.null;
                expect(result.cost).to.be.null;
                expect(result.elements).to.be.not.null;
                expect(result.elements.length).to.be.eq(0);
                expect(result.id).to.be.not.null;
                expect(result.name).to.be.not.null;
                expect(result.maximum).to.be.null;
                expect(result.minimum).to.be.null;
                expect(result.weight).to.be.null;

                expect(Object.keys(result).length).to.be.eq(7);

                done();
            }).catch((err: Error) => {
                done(err);
            });
        });

        it('should return null given non-existing feedstuff id', (done) => {
            feedstuffRepository.getFeedstuffById(nonExistingFeedstuffId).then((result: DomainFeedstuff) => {
                expect(result).to.be.null;
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
    });

    describe('listElementsByFeedstuffId', () => {
        it('should return list of 80 elements given existing feedstuff id', (done) => {
            feedstuffRepository.listElementsByFeedstuffId(existingFeedstuffId).then((result: DomainFeedstuffMeasurement[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(80);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });

        it('should return list of elements as correct objects given existing feedstuff id', (done) => {
            feedstuffRepository.listElementsByFeedstuffId(existingFeedstuffId).then((result: DomainFeedstuffMeasurement[]) => {
                let item = result[0];

                expect(item.id).to.be.not.null;
                expect(item.name).to.be.not.null;
                expect(item.value).to.be.not.null;
                expect(item.unit).to.be.not.null;
                expect(item.sortOrder).to.be.not.null;

                expect(Object.keys(item).length).to.be.eq(5);

                done();
            }).catch((err: Error) => {
                done(err);
            });
        });

        it('should return list of 0 elements given non-existing feedstuff id', (done) => {
            feedstuffRepository.listElementsByFeedstuffId(nonExistingFeedstuffId).then((result: DomainFeedstuffMeasurement[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(0);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
    });


    describe('getSuggestedValuesByFormulaIdAndFeedstuffId', () => {
        it('should return suggested value given existing formula id and existing feedstuff id', (done) => {
            feedstuffRepository.getSuggestedValuesByFormulaIdAndFeedstuffId(existingFormulaIdWithSuggestedValue, existingFeedstuffIdWithSuggestedValue).then((result: DomainSuggestedValue) => {
                expect(result).to.be.not.null;
                expect(Object.keys(result).length).to.be.eq(2);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
        it('should return null given non-existing formula id and existing feedstuff id', (done) => {
            feedstuffRepository.getSuggestedValuesByFormulaIdAndFeedstuffId(nonExistingFormulaId, nonExistingFeedstuffId).then((result: DomainSuggestedValue) => {
                expect(result).to.be.null;
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
    });



















});