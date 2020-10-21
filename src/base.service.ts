import { Injectable } from "@nestjs/common";
import { BaseEntity, DeepPartial, DeleteResult, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { EntityId } from "typeorm/repository/EntityId";
import { IBaseService } from "./i.base.service";

// @Injectable()
export class BaseService<T extends BaseEntity, R extends Repository<T> > implements IBaseService<T> {
    constructor(private readonly repository: Repository<T>) {}
    findById(id: EntityId): Promise<T> {
        return this.repository.findOne(id);
    }
    findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.findByIds(ids);
    }

    create(payload: DeepPartial<T>): Promise<T> {
        return this.repository.save(payload);
    }

    async update(id: EntityId, payload: QueryDeepPartialEntity<T>): Promise<T> {
        const record = await this.findById(id);
        Object.assign(record, payload);
        return record.save();
        // await this.repository.update(id, payload);
        // return this.findById(id);
    }

    delete(id: EntityId): Promise<DeleteResult> {
        throw new Error("Method not implemented.");
    }


}