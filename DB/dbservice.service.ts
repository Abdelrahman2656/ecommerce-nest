import { Model, ProjectionType, QueryFilter, QueryOptions, Types } from 'mongoose';
export abstract class DBservice<T> {
  //constructor
  constructor(private readonly _model: Model<T >) {}
  //create
  create(document: Partial <T>): Promise<T> {
    const newDocument = this._model.create(document);
    return newDocument;
  }
  //find by id
  findById(id: Types.ObjectId): Promise<T | null> {
    const document = this._model.findById(id);
    return document;
  }
  //find one
  findOne(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    return this._model.findOne(filter || {}, projection, options);
  }
  // find 
  find(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return this._model.find(filter || {}, projection, options);
  } 
  
}
