// Imports
import { IElementRepository } from './../element';

// Imports domain models
import { Element as DomainElement } from './../../models/element';

export class MockElementRepository implements IElementRepository {

    private elements = [
        new DomainElement('1', 'Element1', 0, 0, 0, '%', 0),
        new DomainElement('2', 'Element2', 0, 0, 0, '%', 0),
        new DomainElement('3', 'Element3', 0, 0, 0, '%', 0),
        new DomainElement('4', 'Element4', 0, 0, 0, '%', 0),
        new DomainElement('5', 'Element5', 0, 0, 0, '%', 0)
    ];


    constructor(config: any) {

    }

    public listElements(): Promise<DomainElement[]> {
        return Promise.resolve(this.elements);
    }

}