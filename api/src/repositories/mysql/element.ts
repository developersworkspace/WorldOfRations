// Imports
import * as util from 'util';
import { IElementRepository } from './../element';
import { Base } from './base';

// Imports data models
import { Element as DataElement } from './../../data-models/element';

// Imports domain models
import { Element as DomainElement } from './../../models/element';

export class ElementRepository extends Base implements IElementRepository {

    constructor(config: any) {
        super(config);
    }

    public listElements(): Promise<DomainElement[]> {
        return this.query('CALL listElements();').then((result: DataElement[]) => {
            return result.map((x) => new DomainElement(x.id, x.name, 0, 0, 0, x.unit, x.sortOrder));
        });
    }
}
