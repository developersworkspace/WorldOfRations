// Imports
import * as uuid from 'uuid';

// Imports repositories
import { ElementRepository } from './../repositories/mysql/element';

// Imports domain models
import { Element as DomainElement } from './../models/element';

export class ElementService {

    constructor(private elementRepository: ElementRepository) {
    }

    public listElements(): Promise<DomainElement[]> {
        return this.elementRepository.listElements();
    }
}

