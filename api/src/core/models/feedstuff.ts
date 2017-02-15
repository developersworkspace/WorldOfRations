// Imports models
import { Element } from './element';

// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './feedstuff-measurement';

export class Feedstuff {

    id: string;
    name: string;
    minimum: number;
    maximum: number;
    cost: number;
    weight: number;
    elements: DomainFeedstuffMeasurement[] = [];

    constructor(id: string, name: string, minimum: number, maximum: number, cost: number) {
        this.id = id;
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.cost = cost;
        this.weight = null;
    }
}