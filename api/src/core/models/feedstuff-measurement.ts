export class FeedstuffMeasurement {
    id: string;
    name: string;
    value: number;
    unit: string;
    sortOrder: number;

    constructor(id: string, name: string, value: number, unit: string, sortOrder: number) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.sortOrder = sortOrder;
    }
}