// Imports
import proxyquire = require('proxyquire');
import 'mocha';
import { expect } from 'chai';

// Imports services
import { FeedstuffService } from './../../../../api/src/core/services/feedstuff';

describe('FeedstuffService', () => {

    let feedstuffService = null;
    beforeEach(function (done: Function) {

        feedstuffService = new FeedstuffService({
                db: {
                    server: '127.0.0.1',
                    user: 'worldofrations_user',
                    password: 'worldofrations_password',
                    database: 'worldofrations'
                }
            })
        done();
    });

    describe('listFeedstuffs', () => {
        it('should return list of feedstuffs', (done) => {
            feedstuffService.listFeedstuffs().then((result: any[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.greaterThan(0);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
    });


    describe('listExampleFeedstuffs', () => {
        it('should return list of feedstuffs', (done) => {
            feedstuffService.listExampleFeedstuffs().then((result: any[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(13);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });
    });

    describe('getSuggestedValues', () => {

        it('should return list of suggested values', (done) => {
            feedstuffService.getSuggestedValues('CB0360F3-4617-4922-B20D-C3F223BBBCEB', '0CA0953B-C75B-48A1-A31D-89FACC248E90').then((result: any) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(1);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });

        it('should return empty list given feedstuff id with no suggested values', (done) => {
            feedstuffService.getSuggestedValues('CB0360F3-4617-4922-B20D-C3F223BBBCEB', '6B5F4F25-6661-4D4B-ABC7-D44AEFCDE955').then((result: any) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.eq(0);
                done();
            }).catch((err: Error) => {
                done(err);
            });
        });

    });
});