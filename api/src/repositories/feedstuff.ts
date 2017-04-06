// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';
import { CompositionElement as DomainCompositionElement } from './../models/composition-element';
import { SupplementElement as DomainSupplementElement } from './../models/supplement-element';
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { SuggestedValue as DomainSuggestedValue } from './../models/suggested-value';

export interface IFeedstuffRepository {
    listFeedstuffs(username: string): Promise<DomainFeedstuff[]>;
    listExampleFeedstuffs(): Promise<DomainFeedstuff[]>;
    listElementsByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]>;
    listSupplementFeedstuffByElementId(element: DomainCompositionElement): Promise<DomainSupplementElement>;
    listElementsByUserFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]>;
    listFeedstuffsByUsername(username: string): Promise<DomainFeedstuff[]>;

    findFeedstuffByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuff>;
    findUserFeedstuffByFeedstuffId(feedstuffId: string, username: string): Promise<DomainFeedstuff>;
    findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue>;
    
    insertUserFeedstuff(username: string, id: string, name: string, description: string): Promise<Boolean>;
    insertUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean>;

    updateUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean>;
}