export class FormulationFeedstuff {
    constructor(
        public id: string,
        public name: string,
        public minimum: number,
        public maximum: number,
        public cost: number,
        public weight: number
    ) {
    }
}