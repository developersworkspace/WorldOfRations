// Imports data models
import { Element as DataElement } from './element';

export class FeedstuffMeasurement extends DataElement {
    
    value: number;

    constructor(id: string, name: string, unit: string, sortOrder: number, value: number) {
        super(id, name, unit, sortOrder);

        this.value = value;
    }

} 