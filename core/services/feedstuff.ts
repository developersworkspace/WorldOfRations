import { config } from './../config';
import { FeedstuffRepository } from './../repositories/feedstuff';

export class FeedstuffService {

    feedstuffRepository: FeedstuffRepository;

    constructor() { 
        this.feedstuffRepository = new FeedstuffRepository(config.db);
    }

    public listFeedstuff() {
        return this.feedstuffRepository.listFeedstuffs();
    }

    public listExampleFeedstuff() {
        return this.feedstuffRepository.listExampleFeedstuffs();
    }

    public getSuggestedValues(formulaId: string, feedstuffId: string) {
        return this.feedstuffRepository.getSuggestedValues(formulaId, feedstuffId);
    }
}

