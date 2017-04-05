// Imports
import { Base } from './base';
import * as util from 'util';
import * as co from 'co';

// Imports domain models
import { FeedstuffMeasurement as DomainFeedstuffMeasurement } from './../../models/feedstuff-measurement';
import { CompositionElement as DomainCompositionElement } from './../../models/composition-element';
import { SupplementElement as DomainSupplementElement } from './../../models/supplement-element';
import { Feedstuff as DomainFeedstuff } from './../../models/feedstuff';
import { SupplementFeedstuff as DomainSupplementFeedstuff } from './../../models/supplement-feedstuff';
import { SuggestedValue as DomainSuggestedValue } from './../../models/suggested-value';

// Imports data models
import { FeedstuffMeasurement as DataFeedstuffMeasurement } from './../../data-models/feedstuff-measurement';
import { Feedstuff as DataFeedstuff } from './../../data-models/feedstuff';
import { ExampleFeedstuff as DataExampleFeedstuff } from './../../data-models/example-feedstuff';
import { SupplementFeedstuff as DataSupplementFeedstuff } from './../../data-models/supplement-feedstuff';
import { SuggestedValue as DataSuggestedValue } from './../../data-models/suggested-value';

export class FeedstuffRepository extends Base {

    constructor(config: any) {
        super(config);
    }

    public listFeedstuffs(username: string): Promise<DomainFeedstuff[]> {
        let self = this;

        return co(function* () {
            let listFeedstuffsResult = yield self.query(util.format('CALL listFeedstuffs(%s);', this.escapeAndFormat(username)));


             return listFeedstuffsResult.map(x => new DomainFeedstuff(x.id, x.name, null, null, null));
        });
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        return this.query('CALL listExampleFeedstuffs();').then((listExampleFeedstuffsResult: DataExampleFeedstuff[]) => {
            return listExampleFeedstuffsResult.map(x => new DomainFeedstuff(x.id, x.name, x.minimum, x.maximum, x.cost));
        });
    }

    public findFeedstuffByFeedstuffId(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
        return this.query(util.format('CALL findFeedstuffByFeedstuffId(%s, %s);', this.escapeAndFormat(feedstuffId), this.escapeAndFormat(username))).then((findFeedstuffByFeedstuffIdResult: DataFeedstuff[]) => {
            if (findFeedstuffByFeedstuffIdResult.length == 0) {
                return null;
            } else {
                return findFeedstuffByFeedstuffIdResult.map(x => new DomainFeedstuff(x.id, x.name, null, null, null))[0];
            }
        });
    }

    public findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue> {
        return this.query(util.format('CALL findSuggestedValuesByFormulaIdAndFeedstuffId(%s, %s);', this.escapeAndFormat(formulaId), this.escapeAndFormat(feedstuffId)))
            .then((findSuggestedValuesByFormulaIdAndFeedstuffIdResult: DataSuggestedValue[]) => {
                if (findSuggestedValuesByFormulaIdAndFeedstuffIdResult.length == 0) {
                    return null;
                } else {
                    return findSuggestedValuesByFormulaIdAndFeedstuffIdResult.map(x => new DomainSuggestedValue(x.minimum, x.maximum))[0];
                }
            });
    }

    public listElementsByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return this.query(util.format('CALL listElementsByFeedstuffId(%s);', this.escapeAndFormat(feedstuffId)))
            .then((listElementsByFeedstuffIdResult: DataFeedstuffMeasurement[]) => {
                return listElementsByFeedstuffIdResult.map(x => new DomainFeedstuffMeasurement(x.id, x.name, x.value, x.unit, x.sortOrder));
            });
    }

    public listSupplementFeedstuffByElementId(element: DomainCompositionElement): Promise<DomainSupplementElement> {
        return this.query(util.format('CALL listSupplementFeedstuffByElementId(%s, %s);', this.escapeAndFormat(element.id), (element.minimum * 1000) - (element.value * 1000)))
            .then((getSupplementValuesRecordSet: DataSupplementFeedstuff[]) => {
                let supplementElement = new DomainSupplementElement(element.id, element.name, element.unit, element.sortOrder);

                supplementElement.supplementFeedstuffs = getSupplementValuesRecordSet.map(x => new DomainSupplementFeedstuff(x.id, x.name, x.weight));
                supplementElement.selectedSupplementFeedstuffs = supplementElement.supplementFeedstuffs.length == 0 ? [] : [supplementElement.supplementFeedstuffs[0]];
                return supplementElement;
            });
    }

    // TODO: Move listElements call into its own repository
    public listElementsByUserFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        return this.query(util.format('CALL listElementsByUserFeedstuffId(%s);', this.escapeAndFormat(feedstuffId)))
            .then((listElementsByUserFeedstuffIdResult: DataFeedstuffMeasurement[]) => {

                if (listElementsByUserFeedstuffIdResult.length == 0) {
                    return this.query(util.format('CALL listElements();'))
                        .then((listElementsResult: DataFeedstuffMeasurement[]) => {
                            return listElementsResult.map(x => new DomainFeedstuffMeasurement(x.id, x.name, 0, x.unit, x.sortOrder));
                        });
                } else {
                    return listElementsByUserFeedstuffIdResult.map(x => new DomainFeedstuffMeasurement(x.id, x.name, x.value, x.unit, x.sortOrder));
                }
            });
    }

    public listFeedstuffsByUsername(username: string): Promise<DomainFeedstuff[]> {
        return this.query(util.format('CALL listFeedstuffsByUsername(%s);', this.escapeAndFormat(username))).then((listFeedstuffsByUsernameResult: DataFeedstuff[]) => {
            return listFeedstuffsByUsernameResult.map(x => new DomainFeedstuff(x.id, x.name, null, null, null));
        });
    }

    public insertUserFeedstuff(username: string, id: string, name: string, description: string): Promise<Boolean> {
        return this.query(util.format('CALL insertUserFeedstuff(%s, %s, %s, %s);', this.escapeAndFormat(username), this.escapeAndFormat(id), this.escapeAndFormat(name), this.escapeAndFormat(description))).then((insertUserFeedstuffResult: any[]) => {
            return true;
        });
    }

    public insertUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean> {
        return this.query(util.format('CALL insertUserFeedstuffMeasurement(%s, %s, %s);', this.escapeAndFormat(feedstuffId), this.escapeAndFormat(elementId), value)).then((insertUserFeedstuffMeasurementResult: any[]) => {
            return true;
        });
    }


    // TODO: Create updateUserFeedstuffMeasurement SP
    public updateUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean> {
        return this.query(util.format('CALL updateUserFeedstuffMeasurement(%s, %s, %s);', this.escapeAndFormat(feedstuffId), this.escapeAndFormat(elementId), value)).then((insertUserFeedstuffMeasurementResult: any[]) => {
            return true;
        });
    }
}