// Imports domain models
import { CompositionElement as DomainCompositionElement } from './composition-element';
import { SupplementElement as DomainSupplementElement } from './supplement-element';
import { Feedstuff as DomainFeedstuff } from './feedstuff';
import { Formula as DomainFormula } from './formula';

export class Formulation {
    public id: string;
    public feedstuffs: DomainFeedstuff[] = [];
    public composition: DomainCompositionElement[] = [];
    public formula: DomainFormula;
    public feasible: boolean;
    public cost: number;
    public currencyCode: string;
    public supplementComposition: DomainSupplementElement[];

    clean() {
        this.feedstuffs = this.feedstuffs.map(x => {
            x.elements = null;
            return x;
        });

        this.formula.elements = null;
        
    }
}