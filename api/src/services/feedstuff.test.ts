import 'mocha';
import { expect } from 'chai';

// Imports services
import { FeedstuffService } from './feedstuff';

// Imports repositories
import { MockFeedstuffRepository } from './../repositories/mock/feedstuff';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

describe('FeedstuffService', () => {

    let feedstuffService: FeedstuffService = null;

    let validUsername = 'ValidUsername';

    let validFormulaId = '1';
    let validFeedstuffId = '1';

    let validUserFeedstuffId = '6';
    let validUserFeedstuffIdWitNoFeedstuffMeasurements = '8';

    beforeEach(() => {
        let feedstuffRepository = new MockFeedstuffRepository(null);

        feedstuffService = new FeedstuffService(feedstuffRepository);
    });

    describe('populateElementsOfFeedstuffs', () => {
        it('should return list of feedstuffs where elements are populated', () => {
            return feedstuffService.populateElementsOfFeedstuffs(
                [
                    new DomainFeedstuff('1', null, 10, 100, 5000),
                    new DomainFeedstuff('2', null, 10, 100, 5000)
                ]
            ).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(2);

                expect(result[0].elements).to.be.not.null;
                expect(result[1].elements).to.be.not.null;

                expect(result[0].elements.length).to.be.eq(1);
                expect(result[1].elements.length).to.be.eq(1);
            });
        });


        it('should return list of feedstuffs where elements are populated given user feedstuffs', () => {
            return feedstuffService.populateElementsOfFeedstuffs(
                [
                    new DomainFeedstuff('5', null, 10, 100, 5000),
                    new DomainFeedstuff('6', null, 10, 100, 5000)
                ]
            ).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(2);

                expect(result[0].elements).to.be.not.null;
                expect(result[1].elements).to.be.not.null;

                expect(result[0].elements.length).to.be.eq(1);
                expect(result[1].elements.length).to.be.eq(1);
            });
        });
    });

    describe('populateNamesOfFeedstuffs', () => {
        it('should return list of feedstuffs where feedstuffs names are populated', () => {
            return feedstuffService.populateNamesOfFeedstuffs(
                [
                    new DomainFeedstuff('1', null, 10, 100, 5000),
                    new DomainFeedstuff('2', null, 10, 100, 5000)
                ],
                null
            ).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(2);

                expect(result[0].name).to.be.not.null;
                expect(result[1].name).to.be.not.null;
            });
        });

        it('should return list of feedstuffs where feedstuffs names are populated given user feedstuffs', () => {
            return feedstuffService.populateNamesOfFeedstuffs(
                [
                    new DomainFeedstuff('5', null, 10, 100, 5000),
                    new DomainFeedstuff('6', null, 10, 100, 5000)
                ],
                validUsername
            ).then((result: DomainFeedstuff[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(2);

                expect(result[0].name).to.be.not.null;
                expect(result[1].name).to.be.not.null;
            });
        });
    });


    describe('listFeedstuffs', () => {
        it('should return list of feedstuffs given null username', () => {
            return feedstuffService.listFeedstuffs(null).then((listFeedstuffsResult: DomainFeedstuff[]) => {
                expect(listFeedstuffsResult.length).to.be.eq(4);
            });
        });

        it('should return list of feedstuffs given valid username', () => {
            return feedstuffService.listFeedstuffs(validUsername).then((listFeedstuffsResult: DomainFeedstuff[]) => {
                expect(listFeedstuffsResult.length).to.be.eq(7);
            });
        });
    });

    describe('listExampleFeedstuffs', () => {
        it('should return list of feedstuffs', () => {
            return feedstuffService.listExampleFeedstuffs().then((listExampleFeedstuffsResult: DomainFeedstuff[]) => {
                expect(listExampleFeedstuffsResult.length).to.be.eq(3);
            });
        });
    });

    describe('findSuggestedValues', () => {
        it('should return suggested value', () => {
            return feedstuffService.findSuggestedValues(validFormulaId, validFeedstuffId).then((findSuggestedValuesResult: DomainSuggestedValue) => {
                expect(findSuggestedValuesResult).to.be.not.null;
            });
        });
    });

    describe('listUserFeedstuffs', () => {
        it('should return list of feedstuffs given null username', () => {
            return feedstuffService.listUserFeedstuffs(null).then((listUserFeedstuffsResult: DomainFeedstuff[]) => {
                expect(listUserFeedstuffsResult.length).to.be.eq(0);
            });
        });

        it('should return list of feedstuffs given valid username', () => {
            return feedstuffService.listUserFeedstuffs(validUsername).then((listUserFeedstuffsResult: DomainFeedstuff[]) => {
                expect(listUserFeedstuffsResult.length).to.be.eq(3);
            });
        });
    });

    describe('createUserFeedstuff', () => {
        it('should return feedstuff', () => {
            return feedstuffService.createUserFeedstuff(validUsername, 'Feedstuff9', null).then((createUserFeedstuffResult: DomainFeedstuff) => {
                expect(createUserFeedstuffResult).to.be.not.null;
            });
        });

        it('should be inserted into repository', () => {
            return feedstuffService.createUserFeedstuff(validUsername, 'Feedstuff9', null).then((createUserFeedstuffResult: DomainFeedstuff) => {
                return feedstuffService.listUserFeedstuffs(validUsername);
            }).then((listUserFeedstuffs: DomainFeedstuff[]) => {
                expect(listUserFeedstuffs.find(x => x.name == 'Feedstuff9')).to.be.not.undefined;
            });
        });
    });

    describe('findUserFeedstuff', () => {
        it('should return null given null username with valid user feedstuff id', () => {
            return feedstuffService.findUserFeedstuff(validUserFeedstuffId, null).then((findUserFeedstuffResult: DomainFeedstuff) => {
                expect(findUserFeedstuffResult).to.be.null;
            });
        });

        it('should return feedstuff given valid username with valid user feedstuff id', () => {
            return feedstuffService.findUserFeedstuff(validUserFeedstuffId, validUsername).then((findUserFeedstuffResult: DomainFeedstuff) => {
                expect(findUserFeedstuffResult).to.be.not.null;
            });
        });

        it('should return null given null username with valid feedstuff id', () => {
            return feedstuffService.findUserFeedstuff(validFeedstuffId, null).then((findUserFeedstuffResult: DomainFeedstuff) => {
                expect(findUserFeedstuffResult).to.be.null;
            });
        });
    });

    describe('listUserFeedstuffMeasurements', () => {
        it('should return list of feedstuff measurements given valid user feedstuff id', () => {
            return feedstuffService.listUserFeedstuffMeasurements(validUserFeedstuffId).then((listUserFeedstuffMeasurementsResult: DomainFeedstuffMeasurement[]) => {
                expect(listUserFeedstuffMeasurementsResult).to.be.not.null;
                expect(listUserFeedstuffMeasurementsResult.length).to.be.eq(1);
            });
        });

        it('should return list of feedstuff measurements given valid user feedstuff id with no feedstuff measurements', () => {
            return feedstuffService.listUserFeedstuffMeasurements(validUserFeedstuffIdWitNoFeedstuffMeasurements).then((listUserFeedstuffMeasurementsResult: DomainFeedstuffMeasurement[]) => {
                expect(listUserFeedstuffMeasurementsResult).to.be.not.null;
                expect(listUserFeedstuffMeasurementsResult.length).to.be.eq(5);
            });
        });
    });

});


function randomNumber(low: number, high: number) {
    return Math.random() * (high - low) + low;
}