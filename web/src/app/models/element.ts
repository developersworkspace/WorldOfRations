// Imports models
import { SupplementFeedstuff } from './supplement-feedstuff';

export class Element {
    public id: string;
    public name: string;
    public minimum: number;
    public maximum: number;
    public value: number;
    public unit: string;
    public sortOrder: number;

    public selectedSupplementFeedstuffs: SupplementFeedstuff[];
    public supplementFeedstuffs: SupplementFeedstuff[];

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
