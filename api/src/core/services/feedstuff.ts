// Imports repositories
import { FeedstuffRepository } from './../repositories/mysql/feedstuff';

// Imports models
import { Feedstuff } from './../models/feedstuff';
import { Element } from './../models/element';

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

    public loadElementsForFeedstuffs(feedstuffs: Feedstuff[]) {
        return new Promise((resolve: Function, reject: Function) => {
            let listOfPromise = [];
            for (let i = 0; i < feedstuffs.length; i++) {
                listOfPromise.push(this.loadElementsForFeedstuff(feedstuffs[i]));
            }
            Promise.all(listOfPromise).then((feedstuffsResult: Feedstuff[]) => {
                resolve(feedstuffsResult);
            });
        });
    }

    private loadElementsForFeedstuff(feedstuff: Feedstuff) {
        return this.feedstuffRepository.listElementsForFeedstuff(feedstuff.id).then((elements: Element[]) => {
            feedstuff.elements = elements;
            return feedstuff;
        });
    }
}

