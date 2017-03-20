export class FormulationFeedstuff {
    constructor(public formulationId: string, 
    public feedstuffId: string, 
    public minimum: number, 
    public maximum: number, 
    public cost: number) {
    }
}