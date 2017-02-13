// Imports data models
import { Element as DataElement } from './element';

// Imports models
import { Element as DomainElement } from './../models/element';

export class FeedstuffMeasurement extends DataElement {
    
    value: number;

    constructor(id: string, name: string, unit: string, sortOrder: number, value: number) {
        super(id, name, unit, sortOrder);

        this.value = value;
    }

    toDomainModel() {
        return new DomainElement(this.id, this.name, null, null, this.value, this.unit, this.sortOrder);
    }


} 