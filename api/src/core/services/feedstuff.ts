// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';

export class FeedstuffService {

    feedstuffRepository: FeedstuffRepository;

    constructor(private config: any) { 
        this.feedstuffRepository = new FeedstuffRepository(this.config.db);
    }

    public listFeedstuffs() {
        return this.feedstuffRepository.listFeedstuffs();
    }

    public listExampleFeedstuffs() {
        return this.feedstuffRepository.listExampleFeedstuffs();
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return this.feedstuffRepository.getSuggestedValues(formulaId, feedstuffId);
    }

    
}

