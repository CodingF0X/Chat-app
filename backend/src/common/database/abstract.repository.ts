import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { stringify } from 'querystring';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<T>) {}

  public get modelRef(): Readonly<Model<T>> {
    return this.model;
  }
  
  async create(document: Omit<T, '_id'>): Promise<T> {
    this.logger.log(`Creating a new ${this.model.modelName}`);
    const createdEntity = new this.model(document);
    return (await createdEntity.save()).toJSON() as unknown as T;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean();
    if (!document) {
      this.logger.warn(
        `Could not find document with filter query ${stringify(filterQuery)}`,
      );

      throw new NotFoundException(`Document Not Found`);
    }
    return document as T;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<T>();

    if (!updatedDocument) {
      this.logger.warn('Could not find updated document', filterQuery);

      throw new NotFoundException(`Document Not Found`);
    }

    return updatedDocument;
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filterQuery).lean<T[]>();
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    const deletedDocument = await this.model
      .findOneAndDelete(filterQuery)
      .lean();

    return deletedDocument as T;
  }
}
