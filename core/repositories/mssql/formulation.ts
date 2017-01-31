import * as sql from 'mssql';
import { Formulation } from './../../models/formulation';
import { Feedstuff } from './../../models/feedstuff';
import { Formula } from './../../models/formula';
import { Element } from './../../models/element';
import * as mongodb from 'mongodb';

export class FormulationRepository {

    constructor(private config: any) {

    }

    public saveFormulation(formulation: Formulation) {
        return new Promise((resolve: Function, reject: Function) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database, (err: Error, db: mongodb.Db) => {
                if (err) {

                } else {
                    var collection = db.collection('fomulations');
                    collection.insertOne(formulation, (err: Error, result: any) => {
                        db.close();
                    });
                }
            });
        });
    }

    public getFormulationById(formulationId: string) {
        return new Promise((resolve: Function, reject: Function) => {
            let mongoClient = new mongodb.MongoClient();
            mongoClient.connect('mongodb://' + this.config.server + ':27017/' + this.config.database, (err: Error, db: mongodb.Db) => {
                if (err) {
                    reject(err);
                } else {
                    var collection = db.collection('fomulations');
                    collection.findOne({ id: formulationId }, (err: Error, formulation: Formulation) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(formulation);
                        }
                    });
                }
            });
        });
    }
}