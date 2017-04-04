// Imports
import { Base } from './base';
import * as util from 'util';

// Imports data models
import { User as DataUser } from './../../data-models/user';

// Imports domain models
import { User as DomainUser } from './../../models/user';

export class UserRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public insertUser(username: string): Promise<Boolean> {
        return this.query(util.format('CALL insertUser(%s, %s)', this.escapeAndFormat(username), new Date().getTime() / 1000)).then((insertUserResult: any[]) => {
            return true;
        });
    }

    public findUserByUsername(username: string): Promise<DomainUser> {
        return this.query(util.format('CALL findUserByUsername(%s)', this.escapeAndFormat(username))).then((findUserByUsernameResult: DataUser[]) => {
            if (findUserByUsernameResult.length == 0) {
                return null;
            } else {
                return new DomainUser(findUserByUsernameResult[0].id, findUserByUsernameResult[0].username, findUserByUsernameResult[0].lastLoginTimestamp);
            }
        });
    }

    public updateLastLoginTimestamp(username: string): Promise<Boolean> {
        return this.query(util.format('CALL updateLastLoginTimestamp(%s, %s)', this.escapeAndFormat(username), new Date().getTime() / 1000)).then((insertUserResult: any[]) => {
            return true;
        });
    }
}