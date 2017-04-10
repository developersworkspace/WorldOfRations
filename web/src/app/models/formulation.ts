import { Formula } from './formula';
import { Feedstuff } from './feedstuff';
import { Element } from './element';

export class Formulation {

    constructor(public id: string, public formula: Formula, public feedstuffs: Feedstuff[], public composition: Element[], public supplementComposition: Element[]) {

    }
}
