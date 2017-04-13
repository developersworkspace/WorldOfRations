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
});
