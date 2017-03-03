//Imports
import * as mongodb from 'mongodb';

// Imports domain models
import { Formulation as DomainFormulation } from './../../models/formulation';

export class FormulationRepository {

    constructor(private config: any) {

    }

    public saveFormulation(formulation: DomainFormulation): Promise<any> {
        let mongoClient = new mongodb.MongoClient();
        return mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database).then((db: mongodb.Db) => {
            var collection = db.collection('formulations');
            formulation.clean();
            return collection.insertOne(formulation).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    public getFormulationById(formulationId: string): Promise<any> {
        let mongoClient = new mongodb.MongoClient();
        return mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database).then((db: mongodb.Db) => {
            var collection = db.collection('formulations');
            return collection.findOne({ id: formulationId }).then((formulation: DomainFormulation) => {
                db.close();
                return formulation;
            });
        });
    }
}