export class Element {
    id: string;
    name: string;
    minimum: number;
    maximum: number;
    value: number;

    constructor(id, name, minimum, maximum, value) {
        this.id = id;
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.value = value;
    }
}