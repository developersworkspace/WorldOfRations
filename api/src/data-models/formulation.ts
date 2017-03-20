export class Formulation {
    constructor(public id: string, 
    public formulaId: string, 
    public feasible: boolean, 
    public cost: number, 
    public currencyCode: string, 
    public timestamp: number) {
    }
}