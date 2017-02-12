export class Element {
    id: string;
    name: string;
    abbreviation: string;
    unit: string;
    sortOrder: number;

    constructor(id: string, name: string, abbreviation: string, unit: string, sortOrder: number) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.abbreviation = abbreviation;
        this.sortOrder = sortOrder;
    }
}