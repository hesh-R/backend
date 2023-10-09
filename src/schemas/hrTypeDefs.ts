export const hrTypeDefs = `#graphql
type HR {
    _id: ID!
    staffId:String!
    email: String!
    password: String!
    name: String!
    avatar: String
  }
  
  input HRSignupInput {
    staffId:String!
    email: String!
    password: String!
    name: String!
    avatar: String
  }
  
  input HRLoginInput {
    staffId:String
    email:String
    password: String!
  }
  
  type Query {
    getHR(id: ID, email: String, staffId: String): HR
  }
    
  type Mutation {
    signupHR(input: HRSignupInput!): HR!
    loginHR(input: HRLoginInput!): HR!
  }
  `;
