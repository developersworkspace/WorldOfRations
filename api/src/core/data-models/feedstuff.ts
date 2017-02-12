// Imports models
import { Element } from './element';

export class Feedstuff {

    id: string;
    name: string;
    minimum: number;
    maximum: number;
    cost: number;

    constructor(id: string, name: string, minimum: number, maximum: number, cost: number) {
        this.id = id;
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.cost = cost;
    }
}