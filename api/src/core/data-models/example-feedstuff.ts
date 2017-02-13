// Imports data models
import { Feedstuff as DataFeedstuff } from './feedstuff';

export class ExampleFeedstuff extends DataFeedstuff {

    minimum: number;
    maximum: number;
    cost: number;

    constructor(id: string, name: string, minimum: number, maximum: number, cost: number) {
        super(id, name);

        this.minimum = minimum;
        this.maximum = maximum;
        this.cost = cost;
    }
}