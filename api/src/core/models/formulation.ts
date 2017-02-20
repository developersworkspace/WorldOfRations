// Imports domain models
import { CompositionElement as DomainCompositionElement } from './composition-element';
import { SupplementElement as DomainSupplementElement } from './supplement-element';
import { Feedstuff as DomainFeedstuff } from './feedstuff';
import { Formula as DomainFormula } from './formula';

export class Formulation {
    id: string;
    feedstuffs: DomainFeedstuff[] = [];
    composition: DomainCompositionElement[] = [];
    formula: DomainFormula;
    feasible: boolean;
    cost: number;
    currencyCode: string;
    supplementComposition: DomainSupplementElement[];

    clean() {
        this.feedstuffs = this.feedstuffs.map(x => {
            x.elements = null;
            return x;
        });

        this.formula.elements = null;
        
    }
}