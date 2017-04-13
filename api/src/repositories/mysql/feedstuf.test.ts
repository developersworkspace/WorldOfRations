import { expect } from 'chai';
import * as co from 'co';
import 'mocha';
import { config } from './../../config';
import * as uuid from 'uuid';

// Imports repositories
import { FeedstuffRepository } from './feedstuff';
import { UserRepository } from './user';
import { Base } from './base';

// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../../models/feedstuff';

describe('FeedstuffRepository', () => {

    describe('listFeedstuffs', () => {

        let feedstuffRepository: FeedstuffRepository = null;
        let userRepository: UserRepository = null;
        let base: Base = null;

        beforeEach(() => {
            base = new Base(config.db);
            feedstuffRepository = new FeedstuffRepository(config.db);
            userRepository = new UserRepository(config.db);
        });

        afterEach(function (done: () => void) {
            let p1 = base.queryForTest('DELETE FROM users WHERE `username` = \'User1\'');
            let p2 = base.queryForTest('DELETE FROM userFeedstuffs WHERE `name` = \'Feedstuff1\'');

            Promise.all([
                p1,
                p2
            ]).then((result) => {
                done();
            });
        });

        it('should return list of feedstuff given null username', () => {

            return co(function* () {

                const listFeedstuffsResult: DomainFeedstuff[] = yield feedstuffRepository.listFeedstuffs(null);

                expect(listFeedstuffsResult.length).to.be.eq(264);
            });
        });


        it('should return list of feedstuff given valid username', () => {

            return co(function* () {

                const insertUserResult = yield userRepository.insertUser('User1');

                const insertUserFeedstuffResult = yield feedstuffRepository.insertUserFeedstuff('User1', uuid.v4(), 'Feedstuff1', 'Feedstuff1');

                const listFeedstuffsResult: DomainFeedstuff[] = yield feedstuffRepository.listFeedstuffs('User1');

                expect(listFeedstuffsResult.length).to.be.eq(264 + 1);
            });
        });
    });

    describe('listExampleFeedstuffs', () => {

        let feedstuffRepository: FeedstuffRepository = null;
        beforeEach(() => {
            feedstuffRepository = new FeedstuffRepository(config.db);
        });

        afterEach(function (done: () => void) {
            done();
        });

        it('should return list of feedstuff', () => {

            return co(function* () {

                const listExampleFeedstuffsResult: DomainFeedstuff[] = yield feedstuffRepository.listExampleFeedstuffs();

                expect(listExampleFeedstuffsResult.length).to.be.eq(13);
            });
        });
    });


    describe('findFeedstuffByFeedstuffId', () => {

        let feedstuffRepository: FeedstuffRepository = null;
        let userRepository: UserRepository = null;
        let base: Base = null;

        beforeEach(() => {
            base = new Base(config.db);
            feedstuffRepository = new FeedstuffRepository(config.db);
            userRepository = new UserRepository(config.db);
        });

        afterEach(function (done: () => void) {
            let p1 = base.queryForTest('DELETE FROM users WHERE `username` = \'User1\'');
            let p2 = base.queryForTest('DELETE FROM userFeedstuffs WHERE `name` = \'Feedstuff1\'');

            Promise.all([
                p1,
                p2
            ]).then((result) => {
                done();
            });
        });

        it('should return feedstuff given feedstuff id', () => {

            return co(function* () {

                const findFeedstuffByFeedstuffIdResult: DomainFeedstuff[] = yield feedstuffRepository.findFeedstuffByFeedstuffId('36995DEF-9B6B-49CD-9AA6-0165478BA4CD');

                expect(findFeedstuffByFeedstuffIdResult).to.be.not.null;
            });
        });


        it('should return null given user feedstuff id', () => {

            return co(function* () {

                const insertUserResult = yield userRepository.insertUser('User1');

                const feedstuffId = uuid.v4();
                const insertUserFeedstuffResult = yield feedstuffRepository.insertUserFeedstuff('User1', feedstuffId, 'Feedstuff1', 'Feedstuff1');

                const findFeedstuffByFeedstuffIdResult: DomainFeedstuff[] = yield feedstuffRepository.findFeedstuffByFeedstuffId(feedstuffId);

                expect(findFeedstuffByFeedstuffIdResult).to.be.null;
            });
        });
    });

    describe('findUserFeedstuffByFeedstuffId', () => {

        let feedstuffRepository: FeedstuffRepository = null;
        let userRepository: UserRepository = null;
        let base: Base = null;

        beforeEach(() => {
            base = new Base(config.db);
            feedstuffRepository = new FeedstuffRepository(config.db);
            userRepository = new UserRepository(config.db);
        });

        afterEach(function (done: () => void) {
            let p1 = base.queryForTest('DELETE FROM users WHERE `username` = \'User1\'');
            let p2 = base.queryForTest('DELETE FROM userFeedstuffs WHERE `name` = \'Feedstuff1\'');

            Promise.all([
                p1,
                p2
            ]).then((result) => {
                done();
            });
        });

        it('should return null given feedstuff id and valid username', () => {

            return co(function* () {

                const findUserFeedstuffByFeedstuffIdResult: DomainFeedstuff[] = yield feedstuffRepository.findUserFeedstuffByFeedstuffId('36995DEF-9B6B-49CD-9AA6-0165478BA4CD', 'User1');

                expect(findUserFeedstuffByFeedstuffIdResult).to.be.null;
            });
        });

       
        it('should return feedstuff given user feedstuff id and valid username', () => {

            return co(function* () {

                const insertUserResult = yield userRepository.insertUser('User1');

                const feedstuffId = uuid.v4();
                const insertUserFeedstuffResult = yield feedstuffRepository.insertUserFeedstuff('User1', feedstuffId, 'Feedstuff1', 'Feedstuff1');

                const findUserFeedstuffByFeedstuffIdResult: DomainFeedstuff[] = yield feedstuffRepository.findUserFeedstuffByFeedstuffId(feedstuffId, 'User1');

                expect(findUserFeedstuffByFeedstuffIdResult).to.be.not.null;
            });
        });

        it('should return null given user feedstuff id and invalid username', () => {

            return co(function* () {

                const insertUserResult = yield userRepository.insertUser('User1');

                const feedstuffId = uuid.v4();
                const insertUserFeedstuffResult = yield feedstuffRepository.insertUserFeedstuff('User1', feedstuffId, 'Feedstuff1', 'Feedstuff1');

                const findUserFeedstuffByFeedstuffIdResult: DomainFeedstuff[] = yield feedstuffRepository.findUserFeedstuffByFeedstuffId(feedstuffId, 'User2');

                expect(findUserFeedstuffByFeedstuffIdResult).to.be.null;
            });
        });
    });

});
