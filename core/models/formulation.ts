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
    supplementComposition: Element[];
}