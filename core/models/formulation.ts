import { Feedstuff } from './feedstuff';
import { Element } from './element';
import { Formula } from './formula';

export class Formulation {
    id: string;
    feedstuffs: Feedstuff[] = [];
    composition: Element[] = [];
    formula: Formula;
    feasible: boolean;
    cost: number;
    supplementComposition: Element[] = [
        new Element('','QWERTY1', -1, -1, -1, 'unit1', 0),
        new Element('','QWERTY2', -1, -1, -1, 'unit2', 0),
        new Element('','QWERTY3', -1, -1, -1, 'unit3', 0),
        new Element('','QWERTY4', -1, -1, -1, 'unit4', 0)
    ];
}