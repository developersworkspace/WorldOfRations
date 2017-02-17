// Imports domain models
import { FormulaMeasurement as DomainFormulaMeasurement } from './formula-measurement';

export class Formula {

    id: string;
    name: string;
    elements: DomainFormulaMeasurement[] = [];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}