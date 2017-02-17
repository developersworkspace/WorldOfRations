// Imports domain models
import { SupplementFeedstuff as DomainSupplementFeedstuff } from './supplement-feedstuff';

export class SupplementElement {
    id: string;
    name: string;
    unit: string;
    sortOrder: number;

    selectedSupplementFeedstuffs: DomainSupplementFeedstuff[];
    supplementFeedstuffs: DomainSupplementFeedstuff[];

    constructor(id: string, name: string, unit: string, sortOrder: number) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.sortOrder = sortOrder;
    }
}