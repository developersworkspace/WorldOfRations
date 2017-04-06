// Imports
import { Base } from './base';
import * as util from 'util';
import * as co from 'co';
import { IFeedstuffRepository } from './../feedstuff';

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

export class FeedstuffRepository extends Base implements IFeedstuffRepository {

    constructor(config: any) {
        super(config);
    }


    // TODO: Move userFeedstuffs into a separate method on repository
    public listFeedstuffs(username: string): Promise<DomainFeedstuff[]> {
        let self = this;

        return co(function* () {
            let listFeedstuffsResult: DataFeedstuff[] = yield self.query(util.format('CALL listFeedstuffs(%s);', self.escapeAndFormat(username)));

            return listFeedstuffsResult.map(x => new DomainFeedstuff(x.id, x.name, null, null, null));
        });
    }

    public listExampleFeedstuffs(): Promise<DomainFeedstuff[]> {
        let self = this;

        return co(function* () {
            let listExampleFeedstuffsResult: DataExampleFeedstuff[] = yield self.query('CALL listExampleFeedstuffs();');

            return listExampleFeedstuffsResult.map(x => new DomainFeedstuff(x.id, x.name, x.minimum, x.maximum, x.cost));
        });
    }

    public findFeedstuffByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuff> {
        let self = this;

        return co(function* () {
            let findFeedstuffByFeedstuffIdResult: DataFeedstuff[] = yield self.query(util.format('CALL findFeedstuffByFeedstuffId(%s, %s);', self.escapeAndFormat(feedstuffId), self.escapeAndFormat(null)));

            if (findFeedstuffByFeedstuffIdResult.length == 0) {
                return null;
            } else {
                return findFeedstuffByFeedstuffIdResult.map(x => new DomainFeedstuff(x.id, x.name, null, null, null))[0];
            }
        });
    }

    public findUserFeedstuffByFeedstuffId(feedstuffId: string, username: string): Promise<DomainFeedstuff> {
        let self = this;

        return co(function* () {
            let findFeedstuffByFeedstuffIdResult: DataFeedstuff[] = yield self.query(util.format('CALL findFeedstuffByFeedstuffId(%s, %s);', self.escapeAndFormat(feedstuffId), self.escapeAndFormat(username)));

            if (findFeedstuffByFeedstuffIdResult.length == 0) {
                return null;
            } else {
                return findFeedstuffByFeedstuffIdResult.map(x => new DomainFeedstuff(x.id, x.name, null, null, null))[0];
            }
        });
    }

    public findSuggestedValuesByFormulaIdAndFeedstuffId(formulaId: string, feedstuffId: string): Promise<DomainSuggestedValue> {
        let self = this;

        return co(function* () {
            let findSuggestedValuesByFormulaIdAndFeedstuffIdResult: DataSuggestedValue[] = yield self.query(util.format('CALL findSuggestedValuesByFormulaIdAndFeedstuffId(%s, %s);', self.escapeAndFormat(formulaId), self.escapeAndFormat(feedstuffId)));

            if (findSuggestedValuesByFormulaIdAndFeedstuffIdResult.length == 0) {
                return null;
            } else {
                return findSuggestedValuesByFormulaIdAndFeedstuffIdResult.map(x => new DomainSuggestedValue(x.minimum, x.maximum))[0];
            }
        });
    }

    public listElementsByFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        let self = this;

        return co(function* () {
            let listElementsByFeedstuffIdResult: DataFeedstuffMeasurement[] = yield self.query(util.format('CALL listElementsByFeedstuffId(%s);', self.escapeAndFormat(feedstuffId)));

            return listElementsByFeedstuffIdResult.map(x => new DomainFeedstuffMeasurement(x.id, x.name, x.value, x.unit, x.sortOrder));
        });
    }

    public listSupplementFeedstuffByElementId(element: DomainCompositionElement): Promise<DomainSupplementElement> {
        let self = this;

        return co(function* () {
            let listSupplementFeedstuffByElementIdResult: DataSupplementFeedstuff[] = yield self.query(util.format('CALL listSupplementFeedstuffByElementId(%s, %s);', self.escapeAndFormat(element.id), (element.minimum * 1000) - (element.value * 1000)));

            let supplementElement = new DomainSupplementElement(element.id, element.name, element.unit, element.sortOrder);

            supplementElement.supplementFeedstuffs = listSupplementFeedstuffByElementIdResult.map(x => new DomainSupplementFeedstuff(x.id, x.name, x.weight));
            supplementElement.selectedSupplementFeedstuffs = supplementElement.supplementFeedstuffs.length == 0 ? [] : [supplementElement.supplementFeedstuffs[0]];
            return supplementElement;
        });
    }

    // TODO: Move listElements call into its own repository
    public listElementsByUserFeedstuffId(feedstuffId: string): Promise<DomainFeedstuffMeasurement[]> {
        let self = this;

        return co(function* () {
            let listElementsByUserFeedstuffIdResult: DataFeedstuffMeasurement[] = yield self.query(util.format('CALL listElementsByUserFeedstuffId(%s);', self.escapeAndFormat(feedstuffId)));

            if (listElementsByUserFeedstuffIdResult.length == 0) {
                let listElementsResult: DataFeedstuffMeasurement[] = yield self.query(util.format('CALL listElements();'));

                return listElementsResult.map(x => new DomainFeedstuffMeasurement(x.id, x.name, 0, x.unit, x.sortOrder));
            } else {
                return listElementsByUserFeedstuffIdResult.map(x => new DomainFeedstuffMeasurement(x.id, x.name, x.value, x.unit, x.sortOrder));
            }
        });
    }

    public listFeedstuffsByUsername(username: string): Promise<DomainFeedstuff[]> {
        let self = this;

        return co(function* () {
            let listFeedstuffsByUsernameResult: DataFeedstuff[] = yield self.query(util.format('CALL listFeedstuffsByUsername(%s);', self.escapeAndFormat(username)));
            return listFeedstuffsByUsernameResult.map(x => new DomainFeedstuff(x.id, x.name, null, null, null));
        });
    }

    public insertUserFeedstuff(username: string, id: string, name: string, description: string): Promise<Boolean> {
        let self = this;

        return co(function* () {
            let insertUserFeedstuffResult: any[] = yield self.query(util.format('CALL insertUserFeedstuff(%s, %s, %s, %s);', self.escapeAndFormat(username), self.escapeAndFormat(id), self.escapeAndFormat(name), self.escapeAndFormat(description)));
            return true;
        });
    }

    public insertUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean> {
        let self = this;

        return co(function* () {
            let insertUserFeedstuffMeasurementResult: any[] = yield self.query(util.format('CALL insertUserFeedstuffMeasurement(%s, %s, %s);', self.escapeAndFormat(feedstuffId), self.escapeAndFormat(elementId), value));
            return true;
        });
    }


    // TODO: Create updateUserFeedstuffMeasurement SP
    public updateUserFeedstuffMeasurement(feedstuffId: string, elementId: string, value: number): Promise<Boolean> {
        let self = this;

        return co(function* () {
            let updateUserFeedstuffMeasurementResult: any[] = yield self.query(util.format('CALL updateUserFeedstuffMeasurement(%s, %s, %s);', self.escapeAndFormat(feedstuffId), self.escapeAndFormat(elementId), value));
            return true;
        });
    }
}