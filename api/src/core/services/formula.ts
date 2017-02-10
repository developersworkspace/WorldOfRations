// Imports repositories
import { FormulaRepository } from './../repositories/mysql/formula';

export class FormulaService {

    formulaRepository: FormulaRepository;

    constructor(private config: any) {
        this.formulaRepository = new FormulaRepository(this.config.db);
     }

    public listFormula() {
      return this.formulaRepository.listFormulas();
    }
}
