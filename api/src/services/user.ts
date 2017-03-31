// Imports repositories
import { UserRepository } from './../repositories/mysql/user'

// Imports domain models


export class UserService {

    public userRepository: UserRepository;

    constructor(private config: any) {
        this.userRepository = new UserRepository(this.config.db);
     }

    public login(username: string): Promise<Boolean> {
      return this.userRepository.insertUser(username);
    }
}

