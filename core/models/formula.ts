// Imports models
import { Element } from './element';

export class Formula {

    id: string;
    name: string;
    elements: Element[] = [];

    constructor(id: string) {
        this.id = id;
    }
}