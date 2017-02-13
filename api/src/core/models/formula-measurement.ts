export class FormulaMeasurement {
    id: string;
    name: string;
    minimum: number;
    maximum: number;
    unit: string;
    sortOrder: number;

    constructor(id: string, name: string, minimum: number, maximum: number, unit: string, sortOrder: number) {
        this.id = id;
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.unit = unit;
        this.sortOrder = sortOrder;
    }
}