// Imports
import { Base } from './base';
import * as util from 'util';

// Imports data models


// Imports domain models

export class UserRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public insertUser(username: string): Promise<Boolean> {
      return this.query(util.format('CALL insertUser(%s, %s)', this.escapeAndFormat(username), new Date().getTime() / 1000)).then((insertUserResult: any[]) => {
            return true;
        });
    }
}