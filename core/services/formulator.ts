/// <reference path="./../typings/index.d.ts"/>

import * as sql from 'mssql';
import config from './../config';
import * as solver from './../node_modules/javascript-lp-solver/src/solver';
import { Formulation } from './../models/formulation';
import { Feedstuff } from './../models/feedstuff';

export class FormulatorService {

    constructor() {

    }

    public formulate(obj: Formulation) {
        let results: any;
        let model = {
            "optimize": "cost",
            "opType": "min",
            "constraints": {
                "Protein": { "min": 30 },
                "Energy": { "min": 250 },
                "Calcium": { "min": 50, "max": 150 },
                "weight": { "max": 100 },
                "Fishmeal": { "min": 27 }
            },
            variables: this.buildVariables(obj.feedstuffs)
        };

        console.log(model);
        results = solver.Solve(model);
        console.log(results);
    }

    private buildVariables(obj: Feedstuff[]) {
        let variables = {};

        for (let i = 0; i < obj.length; i++) {
            let t = {
                'cost': obj[i].cost,
                'weight': 1
            };

            for (let j = 0; j < obj[i].elements.length; j++) {
                t[obj[i].elements[j].name] = obj[i].elements[j].value;
            }

            t[obj[i].name] = 1;

            variables[obj[i].name] = t;
        }

        return variables;
    }
}