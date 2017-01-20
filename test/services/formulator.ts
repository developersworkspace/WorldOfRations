import { expect } from 'chai';
import { FormulatorService } from './../../core/services/formulator'
import { Formulation } from './../../core/models/formulation';
import { Feedstuff } from './../../core/models/feedstuff';
import { Element } from './../../core/models/element';
import { Formula } from './../../core/models/formula';
import * as uuid from 'uuid';


describe('formulate', () => {
  it('should return feasible result', () => {

    let formulatorService = new FormulatorService();

    let formulation = new Formulation();

    let formula = new Formula('');

    let proteinId = uuid.v4();
    let energyId = uuid.v4();
    let calciumId = uuid.v4();
    

    formula.elements.push(new Element(proteinId, 'Protein', 30, 100000, -1));
    formula.elements.push(new Element(energyId, 'Energy', 250, 100000, -1));
    formula.elements.push(new Element(calciumId, 'Calcium', 50, 150, -1));

    formulation.formula = formula;

    let maize = new Feedstuff(uuid.v4(), 'Maize', 'Maize', 0, 100, 2.15);
    maize.elements.push(new Element(proteinId, 'Protein', -1, -1, 9));
    maize.elements.push(new Element(energyId, 'Energy', -1, -1, 1.1));
    maize.elements.push(new Element(calciumId, 'Calcium', -1, -1, 0.02));

    let fishmeal = new Feedstuff(uuid.v4(), 'Fishmeal', 'Fishmeal', 27, 100, 8);
    fishmeal.elements.push(new Element(proteinId, 'Protein', -1, -1, 65));
    fishmeal.elements.push(new Element(energyId, 'Energy', -1, -1, 3.9));
    fishmeal.elements.push(new Element(calciumId, 'Calcium', -1, -1, 3.7));

    let soymeal = new Feedstuff(uuid.v4(), 'Soymeal', 'Soymeal', 0, 100, 6);
    soymeal.elements.push(new Element(proteinId, 'Protein', -1, -1, 44));
    soymeal.elements.push(new Element(energyId, 'Energy', -1, -1, 2.57));
    soymeal.elements.push(new Element(calciumId, 'Calcium', -1, -1, 0.3));

    let ricebran = new Feedstuff(uuid.v4(), 'Ricebran', 'Ricebran', 0, 100, 2);
    ricebran.elements.push(new Element(proteinId, 'Protein', -1, -1, 12));
    ricebran.elements.push(new Element(energyId, 'Energy', -1, -1, 1.99));
    ricebran.elements.push(new Element(calciumId, 'Calcium', -1, -1, 0.1));

    let limestone = new Feedstuff(uuid.v4(), 'Limestone', 'Limestone', 0, 100, 0.4);
    limestone.elements.push(new Element(proteinId, 'Protein', -1, -1, 0));
    limestone.elements.push(new Element(energyId, 'Energy', -1, -1, 0));
    limestone.elements.push(new Element(calciumId, 'Calcium', -1, -1, 28));

    formulation.feedstuffs.push(maize);
    formulation.feedstuffs.push(fishmeal);
    formulation.feedstuffs.push(soymeal);
    formulation.feedstuffs.push(ricebran);
    formulation.feedstuffs.push(limestone);

    let result = formulatorService.formulate(formulation);

    expect(result).to.be.not.null;
    expect(result.feasible).to.be.true;
  });
});