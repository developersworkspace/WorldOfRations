// Imports domain models
import { CompositionElement as DomainCompositionElement } from './composition-element';
import { SupplementElement as DomainSupplementElement } from './supplement-element';
import { Feedstuff as DomainFeedstuff } from './feedstuff';
import { Formula as DomainFormula } from './formula';

// Imports data models
import { Formulation as DataFormulation } from './../data-models/formulation';
import { FormulationFeedstuff as DataFormulationFeedstuff } from './../data-models/formulationFeedstuff';

export class Formulation {
    public feedstuffs: DomainFeedstuff[] = null;
    public composition: DomainCompositionElement[] = null;
    public formula: DomainFormula = null;
    public feasible: boolean = null;
    public cost: number = null;
    public currencyCode: string = null;
    public supplementComposition: DomainSupplementElement[] = null;

    constructor(public id: string) {

    }

    getDataFormalation() {
        return new DataFormulation(this.id, this.formula.id, null, this.feasible, this.cost, this.currencyCode, new Date().getTime());
    }

    getDataFormulationFeedstuffs() {
        return this.feedstuffs.map(x => new DataFormulationFeedstuff(this.id, x.id, x.minimum, x.maximum, x.cost, x.weight));
    }
}