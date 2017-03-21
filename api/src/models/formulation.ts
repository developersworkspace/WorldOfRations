// Imports domain models
import { CompositionElement as DomainCompositionElement } from './composition-element';
import { SupplementElement as DomainSupplementElement } from './supplement-element';
import { Feedstuff as DomainFeedstuff } from './feedstuff';
import { Formula as DomainFormula } from './formula';

// Imports data models
import { Formulation as DataFormulation } from './../data-models/formulation';
import { FormulationFeedstuff as DataFormulationFeedstuff } from './../data-models/formulationFeedstuff';
import { FormulationResultFeedstuff as DataFormulationResultFeedstuffs } from './../data-models/formulationResultFeedstuff';

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

    getDataFormalation() {
        return new DataFormulation(this.id, this.formula.id, this.feasible, this.cost, this.currencyCode, new Date().getTime());
    }

    getDataFormulationFeedstuffs() {
        return this.feedstuffs.map(x => new DataFormulationFeedstuff(this.id, x.id, x.minimum, x.maximum, x.cost, x.weight));
    }
}