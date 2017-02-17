// Imports domain models
import { SupplementFeedstuff as DomainSupplementFeedstuff } from './supplement-feedstuff';

export class Element {
    id: string;
    name: string;
    minimum: number;
    maximum: number;
    value: number;
    unit: string;
    sortOrder: number;

    selectedSupplementFeedstuffs: DomainSupplementFeedstuff[];
    supplementFeedstuffs: DomainSupplementFeedstuff[];

    constructor(id: string, name: string, minimum: number, maximum: number, value: number, unit: string, sortOrder: number) {
        this.id = id;
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.value = value;
        this.unit = unit;
        this.sortOrder = sortOrder;
    }
}