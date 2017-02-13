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

    toModel() {
        return new Element(this.id, this.name, null, null, this.value, this.unit, this.sortOrder);
    }

    toDomainModel() {
        return new DomainFeedstuffMeasurement(this.id, this.name, this.value, this.unit, this.sortOrder);
    }


} 