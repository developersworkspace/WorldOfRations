import { Element } from './element';
import { Feedstuff } from './feedstuff';
import { Formula } from './formula';

export class Formulation {

    constructor(public id: string, public formula: Formula, public feedstuffs: Feedstuff[], public composition: Element[], public supplementComposition: Element[]) {

    }
}
