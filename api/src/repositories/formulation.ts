// Imports domain models
import { Feedstuff as DomainFeedstuff } from './../models/feedstuff';
import { Formulation as DomainFormulation } from './../models/formulation';

export interface IFormulationRepository {

   insertFormulation(formulation: DomainFormulation): Promise<boolean>;

   findFormulationById(formulationId: string): Promise<DomainFormulation>;

   listFormulationFeedstuffByFormulationId(formulationId: string): Promise<DomainFeedstuff[]>;
   listFormulations(): Promise<DomainFormulation[]>;

}
