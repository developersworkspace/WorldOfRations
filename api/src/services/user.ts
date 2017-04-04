// Imports repositories
import { UserRepository } from './../repositories/mysql/user'

// Imports domain models
import { User as DomainUser } from './../models/user';

export class UserService {

    public userRepository: UserRepository;

    constructor(private config: any) {
        this.userRepository = new UserRepository(this.config.db);
     }

    public login(username: string): Promise<Boolean> {
      return this.userRepository.findUserByUsername(username).then((findUserByUsernameResult: DomainUser) => {
        if (findUserByUsernameResult == null) {
            return this.userRepository.insertUser(username);
        }else {
            return this.userRepository.updateLastLoginTimestamp(username);
        }
      });
    }
}

