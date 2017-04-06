// Imports repositories
import { FormulaRepository } from './../repositories/mysql/formula';

// Imports domain models
import { Formula as DomainFormula } from './../models/formula';

export class FormulaService {

    public formulaRepository: FormulaRepository;

    constructor(private config: any) {
        this.formulaRepository = new FormulaRepository(this.config.db);
     }

    public listFormula(): Promise<DomainFormula[]> {
      return this.formulaRepository.listFormulas();
    }
}
