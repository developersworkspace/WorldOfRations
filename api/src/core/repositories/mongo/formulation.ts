//Imports
import * as mongodb from 'mongodb';
import { winston } from './../../logger';

// Imports domain models
import { Formulation as DomainFormulation } from './../../models/formulation';

export class FormulationRepository {

    constructor(private config: any) {

    }

    public saveFormulation(formulation: DomainFormulation): Promise<Boolean> {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FormulationRepository.saveFormulation');
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                    winston.profile('FormulationRepository.saveFormulation');
                } else {
                    var collection = db.collection('formulations');
                    formulation.clean();
                    collection.insertOne(formulation, (err: Error, result: any) => {
                        db.close();
                        resolve(true);
                        winston.profile('FormulationRepository.saveFormulation');
                    });
                }
            });
        });
    }

    public getFormulationById(formulationId: string): Promise<DomainFormulation> {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FormulationRepository.getFormulationById');
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('formulations');
                    collection.findOne({ id: formulationId }, (err: Error, formulation: DomainFormulation) => {
                        if (err) {
                            reject(err);
                            winston.profile('FormulationRepository.getFormulationById');
                        } else {
                            resolve(formulation);
                            winston.profile('FormulationRepository.getFormulationById');
                        }
                    });
                }
            });
        });
    }
}