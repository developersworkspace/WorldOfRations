import { Element } from './element';

export class Feedstuff {

    id: string;
    name: string;
    searchText: string;
    minimum: number;
    maximum: number;
    cost: number;
    elements: Element[] = [];

    constructor(id, name, searchText, minimum, maximum, cost) {
        this.id = id;
        this.name = name;
        this.searchText = searchText;
        this.minimum = minimum;
        this.maximum = maximum;
        this.cost = cost;
    }
}