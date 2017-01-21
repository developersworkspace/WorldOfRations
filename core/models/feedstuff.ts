import { Element } from './element';

export class Feedstuff {

    id: string;
    name: string;
    searchText: string;
    minimum: number;
    maximum: number;
    cost: number;
    weight: number;
    elements: Element[] = [];

    constructor(id: string, name: string, searchText: string, minimum: number, maximum: number, cost: number) {
        this.id = id;
        this.name = name;
        this.searchText = searchText;
        this.minimum = minimum;
        this.maximum = maximum;
        this.cost = cost;
    }
}