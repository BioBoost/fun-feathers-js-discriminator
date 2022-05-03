// posts-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Array<Model<any>> {
  const modelName = 'posts';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }

  // Generic Post Schema
  const PostSchema = new Schema({
    text: { type: String, required: true }
  }, {
    discriminatorKey: '_type',
    timestamps: true,
  });

  // Generate Generic Post Model
  const PostModel = mongooseClient.model<any>(modelName, PostSchema);

  // Subschema's
  const ImagePostSchema = new Schema({
    image: { type: String, required: true }
  }, {
    discriminatorKey: '_type',
    timestamps: true,
  });

  // Models for Subschema's
  // Note the use of `Post.discriminator` rather than `mongoose.discriminator`.
  const ImagePostModel = PostModel.discriminator('image', ImagePostSchema);

  return [PostModel, ImagePostModel];
}