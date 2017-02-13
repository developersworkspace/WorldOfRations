// Imports models
import { Feedstuff } from './feedstuff';
import { Element } from './element';
import { Formula } from './formula';

// Imports domain models
import { CompositionElement as DomainCompositionElement } from './composition-element';
import { SupplementElement as DomainSupplementElement } from './supplement-element';

export class Formulation {
    id: string;
    feedstuffs: Feedstuff[] = [];
    composition: DomainCompositionElement[] = [];
    formula: Formula;
    feasible: boolean;
    cost: number;
    supplementComposition: DomainSupplementElement[];
}