//Imports
import * as mongodb from 'mongodb';
import { winston } from './../../logger';

// Import models
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';

export class FormulationRepository {

    constructor(private config: any) {

    }

    public saveFormulation(formulation: Formulation): Promise<Boolean> {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FormulationRepository.saveFormulation');
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                    winston.profile('FormulationRepository.saveFormulation');
                } else {
                    var collection = db.collection('formulations');
                    collection.insertOne(formulation, (err: Error, result: any) => {
                        db.close();
                        resolve(true);
                        winston.profile('FormulationRepository.saveFormulation');
                    });
                }
            });
        });
    }

    public getFormulationById(formulationId: string): Promise<Formulation> {
        return new Promise((resolve: Function, reject: Function) => {
            winston.profile('FormulationRepository.getFormulationById');
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('formulations');
                    collection.findOne({ id: formulationId }, (err: Error, formulation: Formulation) => {
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