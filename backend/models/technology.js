import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;

const technologySchema = new Schema ({
  id: {type: String, default: uuid.v1},
  name: String,
  framework: Boolean,
  parentLanguage: String
});

technologySchema.index({'$**': 'text'})

const model = mongoose.model('technology', technologySchema)

export default model
