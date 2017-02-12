// Imports models
import { FormulaElement } from './formula-element';

export class Formula {

    id: string;
    name: string;
    elements: FormulaElement[] = [];

    constructor(id: string) {
        this.id = id;
    }
}