import mongoose from 'mongoose';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import applicantModel from './models/applicant';
import technologyModel from './models/technology';
import companyModel from './models/company';


const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    allApplicants:(root,{searchTerm}) => {
      if (searchTerm !== '') {
        return applicantModel.find({$text: {$search: searchTerm}}).sort({lastName: 'asc'})
      } else {
        return applicantModel.find().sort({lastName: 'asc'})
      }
    },
    applicant: (root,{id}) => {
      return applicantModel.findOne({id: id});
    },
    allTechnologies:(root,{searchTerm}) => {
      if (searchTerm !== '') {
        return technologyModel.find({$text: {$search: searchTerm}}).sort({name: 'asc'})
      } else {
        return technologyModel.find().sort({name: 'asc'})
      }
    },
    technology: (root,{id}) => {
      return technologyModel.findOne({id: id});
    },
    allCompanies: (root,{searchTerm}) => {
      if (searchTerm !== '') {
        return companyModel.find({$text: {$search: searchTerm}}).sort({lastName: 'asc'})
      } else {
        return companyModel.find().sort({lastName: 'asc'})
      }
    },
    company: (root,{id}) => {
      return companyModel.findOne({id: id});
    }
  },
  Mutation: {
    addApplicant: (root,{name, education}) => {
      const applicant = new applicantModel({name: {first: name.first, last: name.last}, education: {school: education.school, graduation: education.graduation} })
      return applicant.save();
    },
    addTechnology: (root,{name, framework}) => {
      const technology = new technologyModel({name: name, framework: framework})
      return technology.save();
    },
    addCompany: (root,{name, address, city, zipcode, startDate}) => {
      const company = new companyModel({name: name, address: address, city: city, zipcode:zipcode, startDate: startDate})
      return company.save();
    }
  }
}

export default resolvers;
