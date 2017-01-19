import { Element } from './element';


export class Formula {

    id: string;
    elements: Element[] = [];

    constructor(id) {
        this.id = id;
    }
}