// Imports repositories
import { IUserRepository } from './../repositories/user';

// Imports domain models
import { User as DomainUser } from './../models/user';

export class UserService {

    constructor(private userRepository: IUserRepository) {
     }

    public login(username: string): Promise<boolean> {
      return this.userRepository.findUserByUsername(username).then((findUserByUsernameResult: DomainUser) => {
        if (findUserByUsernameResult == null) {
            return this.userRepository.insertUser(username);
        }else {
            return this.userRepository.updateLastLoginTimestamp(username);
        }
      });
    }
}
