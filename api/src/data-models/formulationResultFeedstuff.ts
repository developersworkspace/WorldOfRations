export class FormulationResultFeedstuff {
    constructor(public formulationId: string, 
    public feedstuffId: string, 
    public weight: number, 
    public status: number, 
    public cost: number) {
    }
}