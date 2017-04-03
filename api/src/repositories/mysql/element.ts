// Imports
import { Base } from './base';
import * as util from 'util';

// Imports domain models
import { Element as DomainElement } from './../../models/element';

// Imports data models
import { Element as DataElement } from './../../data-models/element';

export class ElementRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listElements(): Promise<DomainElement[]> {
        return this.query('CALL listElements();').then((listElementsResult: DataElement[]) => {
            return listElementsResult.map(x => new DomainElement(x.id, x.name, null, null, null, x.unit, x.sortOrder));
        });
      
    }

}