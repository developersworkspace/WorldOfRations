import { Feedstuff } from './feedstuff';

export class Element {
    id: string;
    name: string;
    minimum: number;
    maximum: number;
    value: number;
    unit: string;
    sortOrder: number;

    // supplementFeedstuffs: Feedstuff[] = [
    //     new Feedstuff('','ABC', null,-1,-1, -1),
    //     new Feedstuff('','XYZ', null,-1,-1, -1)
    // ];

    supplementFeedstuffs: any[] = [
       {
           id: 'ABC',
           text: 'ABC',
           weight: 15
       },
       {
           id: 'DEF',
           text: 'DEF',
           weight: 20
       }
    ];

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