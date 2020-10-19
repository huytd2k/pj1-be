import { DeepPartial, DeleteResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityId} from 'typeorm/repository/EntityId'
export interface IBaseService<T> {
    findById(id: EntityId) : Promise<T>;

    findByIds(ids: [ EntityId ]) : Promise<T[]>;

    create(payload: DeepPartial<T>): Promise<T>;

    update(id: EntityId, payload: QueryDeepPartialEntity<T>): Promise<T>;

    delete(id: EntityId): Promise<DeleteResult>;
}
