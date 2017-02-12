export class Feedstuff {

    id: string;
    name: string;
    minimum: number;
    maximum: number;
    cost: number;
    weight: number;

    constructor(id: string, name: string, minimum: number, maximum: number, cost: number, weight: number) {
        this.id = id;
        this.name = name;
        this.minimum = minimum;
        this.maximum = maximum;
        this.cost = cost;
        this.weight = weight;
    }
}