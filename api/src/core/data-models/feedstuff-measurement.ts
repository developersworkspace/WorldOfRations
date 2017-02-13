// Imports data models
import { Element as DataElement } from './element';

// Imports models
import { Element as Element } from './../models/element';

// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../models/feedstuff-measurement';

export class FeedstuffMeasurement extends DataElement {
    
    value: number;

    constructor(id: string, name: string, unit: string, sortOrder: number, value: number) {
        super(id, name, unit, sortOrder);

        this.value = value;
    }

} 