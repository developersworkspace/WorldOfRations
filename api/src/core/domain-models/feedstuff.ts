// Imports models
import { FeedstuffElement } from './feedstuff-element';

export class Feedstuff {

    id: string;
    name: string;
    minimum: number;
    maximum: number;
    cost: number;
    elements: FeedstuffElement[] = [];

    constructor(id: string, name: string, minimum: number, maximum: number, cost: number) {
        this.id = id;
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.cost = cost;
    }
}