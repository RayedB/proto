import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;

const companySchema = new Schema ({
  id: {type: String, default: uuid.v1},
  name: {type: String, required: true},
  office: {
    address: String,
    city: String,
    zipcode: Number,
  },
  technologies: [{type: Schema.Types.ObjectId, ref: 'technology' }],
  startDate: Date,
  minimumDuration: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  last_login: Date,
});

companySchema.index({'$**': 'text'})

const model = mongoose.model('company', companySchema)

export default model
