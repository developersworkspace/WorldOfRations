// Imports
import { Base } from './base';
import * as util from 'util';

// Imports domain models
import { Formulation as DomainFormulation } from './../../models/formulation';
import { Formula as DomainFormula } from './../../models/formula';

// Imports data models
import { Formulation as DataFormulation } from './../../data-models/formulation';

export class FormulationRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public saveFormulation(formulation: DomainFormulation): Promise<any> {

        let dataFormulation = formulation.getDataFormalation();
        let dataFormulationFeedstuffs = formulation.getDataFormulationFeedstuffs();

        let formulationP = this.query(util.format('CALL insertFormulation(%s, %s, %s, %s, %s, %s);',
            this.escapeAndFormat(formulation.id),
            this.escapeAndFormat(formulation.formula.id),
            formulation.feasible, formulation.cost,
            this.escapeAndFormat(formulation.currencyCode),
            new Date().getTime()));


        let formulationFeedstuffsP = dataFormulationFeedstuffs.map(x => {
            return this.query(util.format('CALL insertFormulationFeedstuff(%s, %s, %s, %s, %s, %s);',
                this.escapeAndFormat(x.formulationId),
                this.escapeAndFormat(x.feedstuffId),
                x.minimum,
                x.maximum,
                x.cost,
                x.weight));
        });

        let p = formulationFeedstuffsP.concat([formulationP]);

        return Promise.all(p);
    }

    public getFormulationById(formulationId: string): Promise<DomainFormulation> {
        return this.query(util.format('CALL getFormulationById(%s);', this.escapeAndFormat(formulationId))).then((result: DataFormulation[]) => {

            let formulation = new DomainFormulation(result[0].id);
            formulation.formula = new DomainFormula(result[0].formulaId, null);
            formulation.cost = result[0].cost;
            formulation.feasible = result[0].feasible;
            formulation.currencyCode = result[0].currencyCode;

            return formulation;
        });
    }

    public getFormulations(): Promise<any> {
        return this.query('CALL listFormulations();').then((result: DataFormulation[]) => {

            return result.map(x => {
                let formulation = new DomainFormulation(result[0].id);
                formulation.id = result[0].id;
                formulation.formula = new DomainFormula(result[0].formulaId, null);
                formulation.cost = result[0].cost;
                formulation.feasible = result[0].feasible;
                formulation.currencyCode = result[0].currencyCode;

                return formulation;
            });

        });
    }
}