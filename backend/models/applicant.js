import mongoose from 'mongoose';
import uuid from 'uuid';

const Schema = mongoose.Schema;

const applicantSchema = new Schema ({
  id: {type: String, default: uuid.v1},
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true},
  },
  contacts: {
    email: /*{type: String, required: true}*/ String,
    phone: /*{type: String, required: true}*/ String,
    url1: String,
    url2: String,
    url3: String,
  },
  education: [{
      school: {type: String, required: true},
      graduation: Date,
 }],
  internship: {
    duration: /*{type: String, required: true}*/ String,
    startDate: /*{type: String, required: true}*/ Date,
  },
  experience: [{
    company:{
      name: String,
      position: String,
      description: String,
      startDate: Date,
      endDate: Date
    }
  }],
  foreign_languages :[{
    language: String,
    level: String,
    certifications:[{
      name: String,
      score: String
    }]
  }],
  technologies: [{type: Schema.Types.ObjectId, ref: 'technology' }],
  accomplishment: String,
  isActive : {type: Boolean, default: true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
});

applicantSchema.index({'$**': 'text'})

const model = mongoose.model('applicant', applicantSchema)

export default model
