export class CompositionElement {
    id: string;
    name: string;
    value: number;
    minimum: number;
    maximum: number;
    unit: string;
    sortOrder: number;

    constructor(id: string, name: string, value: number, minimum: number, maximum: number, unit: string, sortOrder: number) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.minimum = minimum;
        this.maximum = maximum;
        this.unit = unit;
        this.sortOrder = sortOrder;
    }
}