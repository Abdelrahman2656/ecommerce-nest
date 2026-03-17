import {
  Model,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  PopulateOptions,
  ProjectionType,
  QueryFilter,
  QueryOptions,
  Types,
} from 'mongoose';
export abstract class DBservice<T> {
  //constructor
  constructor(private readonly _model: Model<T>) {}
  //create
  create(document: Partial<T>): Promise<T> {
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
     populate?: string | string[] | PopulateOptions | PopulateOptions[]
  ): Promise<T | null> {
     const query =this._model.findOne(filter || {}, projection, options);
     if (populate) {
    return query.populate(populate as any ).exec();
  }
  
  return query.exec();
  }
  // find
  find(
    filter?: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
     populate?: string | string[] | PopulateOptions | PopulateOptions[]
  ): Promise<T[]> {
    const query = this._model.find(filter || {}, projection, options);
     if (populate) {
    return query.populate(populate as any).exec();
  }
  
  return query.exec();
  }
  // find one and delete
  findOneAndDelete(
    filter?: QueryFilter<T>,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    return this._model.findOneAndDelete(filter || {}, options);
  }

  // find by id and delete
  findByIdAndDelete(
    id: Types.ObjectId,
    options?: QueryOptions<T>,
  ): Promise<T | null> {
    return this._model.findByIdAndDelete(id, options);
  }
  //count document
   countDocuments(
    filter?: QueryFilter<T>,
    
  ): Promise<number> {
    return this._model.countDocuments(filter||{});
  }
  //paginate
   async paginate(
    filter?: QueryFilter<T>,
    options?: PaginateOptions
  ): Promise<PaginateResult<T>> {
    const paginateModel = this._model as PaginateModel<T>;
    return paginateModel.paginate(filter || {}, options || {});
  }
}
