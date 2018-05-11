import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';



const typeDefs= [`
  scalar Date
    type MyDate {
     created: Date
    }
    type Name {
      first: String
      last: String
    }
    input NameInput {
      first: String
      last: String
    }
    type Contacts {
      phone: String
      email: String
    }
    input ContactInput {
      phone: String
      email: String
    }
    type Education {
      school: String
      graduation: Date
    }
    input EducationInput {
      school: String
      graduation: Date
    }
    type Internship {
      duration: Int
      startDate: Date
    }
    input InternshipInput {
      duration: Int
      startDate: Date
    }
    type Technology {
      id: String
      name: String
      framework: Boolean
    }
    type Applicant{
      id: String
      name: Name
      education: [Education]
      internship: [Internship]
      contacts: Contacts
    }
    type Company {
      id: String
      name: String
      address: String
      city: String
      zipcode: Int
      startDate: Date
    }
    type Query {
      allApplicants(searchTerm: String): [Applicant]
      allTechnologies(searchTerm: String): [Technology]
      allCompanies(searchTerm: String): [Company]
      applicant(id: String!): Applicant
      technology(id: String!): Technology
      company(id: String!): Company
    }
    type Mutation {
      addApplicant(name: NameInput!, education: EducationInput!): Applicant
      addTechnology(name: String!, framework: Boolean): Technology
      addCompany(name: String!, address: String!, city: String!, zipcode: Int!, startDate: Date!): Company
    }
  `];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema
