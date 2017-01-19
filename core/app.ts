import { FormulatorService } from './services/formulator'
import { Formulation } from './models/formulation';
import { Feedstuff } from './models/feedstuff';
import { Element } from './models/element';

let formulatorService = new FormulatorService();

let formulation = new Formulation();


let maize = new Feedstuff('', 'Maize', 'Maize', 0, 100, 2.15);
maize.elements.push(new Element('', 'Protein', -1, -1, 9));
maize.elements.push(new Element('', 'Energy', -1, -1, 1.1));
maize.elements.push(new Element('', 'Calcium', -1, -1, 0.02));

let fishmeal = new Feedstuff('', 'Fishmeal', 'Fishmeal', 27, 100, 8);
fishmeal.elements.push(new Element('', 'Protein', -1, -1, 65));
fishmeal.elements.push(new Element('', 'Energy', -1, -1, 3.9));
fishmeal.elements.push(new Element('', 'Calcium', -1, -1, 3.7));

let soymeal = new Feedstuff('', 'Soymeal', 'Soymeal', 0, 100, 6);
soymeal.elements.push(new Element('', 'Protein', -1, -1, 44));
soymeal.elements.push(new Element('', 'Energy', -1, -1, 2.57));
soymeal.elements.push(new Element('', 'Calcium', -1, -1, 0.3));

let ricebran = new Feedstuff('', 'Ricebran', 'Ricebran', 0, 100, 2);
ricebran.elements.push(new Element('', 'Protein', -1, -1, 12));
ricebran.elements.push(new Element('', 'Energy', -1, -1, 1.99));
ricebran.elements.push(new Element('', 'Calcium', -1, -1, 0.1));

let limestone = new Feedstuff('', 'Limestone', 'Limestone', 0, 100, 0.4);
limestone.elements.push(new Element('', 'Protein', -1, -1, 0));
limestone.elements.push(new Element('', 'Energy', -1, -1, 0));
limestone.elements.push(new Element('', 'Calcium', -1, -1, 28));

formulation.feedstuffs.push(maize);
formulation.feedstuffs.push(fishmeal);
formulation.feedstuffs.push(soymeal);
formulation.feedstuffs.push(ricebran);
formulation.feedstuffs.push(limestone);

formulatorService.formulate(formulation);