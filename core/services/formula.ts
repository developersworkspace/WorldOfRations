import { config } from './../config';
import { FormulaRepository } from './../repositories/formula';

export class FormulaService {

    formulaRepository: FormulaRepository;

    constructor() {
        this.formulaRepository = new FormulaRepository(config.db);
     }

    public listFormula() {
      return this.formulaRepository.listFormulas();
    }
}

