// Imports
import { Base } from './base';
import * as util from 'util';

// Imports domain models
import { Formulation as DomainFormulation } from './../../models/formulation';

export class FormulationRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    // public saveFormulation(formulation: DomainFormulation): Promise<any> {
        
    // }

    // public getFormulationById(formulationId: string): Promise<any> {
    //     let mongoClient = new mongodb.MongoClient();
    //     return mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database).then((db: mongodb.Db) => {
    //         var collection = db.collection('formulations');
    //         return collection.findOne({ id: formulationId }).then((formulation: DomainFormulation) => {
    //             db.close();
    //             return formulation;
    //         });
    //     });
    // }

    // public getFormulations(): Promise<any> {
    //     let mongoClient = new mongodb.MongoClient();
    //     return mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database).then((db: mongodb.Db) => {
    //         var collection = db.collection('formulations');
    //         return collection.find({
    //             feasible: true
    //         }).limit(3).toArray().then((formulations: DomainFormulation[]) => {
    //             db.close();
    //             formulations.forEach(x => {
    //                 x.composition = null;
    //                 x.feedstuffs = null;
    //                 x.formula.elements = null;
    //                 x.supplementComposition = null;
    //             });
                
    //             return formulations;
    //         });
    //     });
    // }
}