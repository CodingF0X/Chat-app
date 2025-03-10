import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractSchema } from './abstract.schema.';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { stringify } from 'querystring';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    this.logger.log(`Creating a new ${this.model.modelName}`);
    const createdEntity = new this.model(document);
    return (await createdEntity.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean();
    if (!document) {
      this.logger.warn(
        `Could not find document with filter query ${stringify(filterQuery)}`,
      );

      throw new NotFoundException(`Document Not Found`);
    }
    return document as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>();

    if (!updatedDocument) {
      this.logger.warn('Could not find updated document', filterQuery);

      throw new NotFoundException(`Document Not Found`);
    }

    return updatedDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return await this.model.find(filterQuery).lean<TDocument[]>();
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const deletedDocument = await this.model
      .findOneAndDelete(filterQuery)
      .lean();

    return deletedDocument as TDocument;
  }
}
