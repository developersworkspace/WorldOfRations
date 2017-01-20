import { Feedstuff } from './feedstuff';
import { Formula } from './formula';

export class Formulation {
    id: string;
    feedstuffs: Feedstuff[] = [];
    formula: Formula;
    feasible: boolean;
    cost: number;
}