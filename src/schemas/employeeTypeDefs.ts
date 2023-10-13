export const employeeTypeDefs = `#graphql
type Attendance {
    date: String!
    isPresent: Boolean!
  }
  
  type Task {
    description: String!
    deadline: String!
    priority: String!
    status: String!
  }
  
  type PerformanceMetric {
    goal: String!
    achievement: String!
  }
  
  type Employee {
    _id: ID!
    name: String!
    position: String!
    department: String!
    email: String!
    phoneNumber: String!
    password:String!
    staffId: String!
    officialEmail: String!
    avatar:String!
    attendance: [Attendance!]!
    leaveBalance: Int!
    tasks: [Task!]!
    performance: [PerformanceMetric!]!
  }
  
  input AttendanceInput {
    date: String!
    isPresent: Boolean!
  }
  
  input TaskInput {
    description: String!
    deadline: String!
    priority: String!
    status: String!
  }
  
  input PerformanceMetricInput {
    goal: String!
    achievement: String!
  }
  
  input EmployeeInput {
    name: String!
    position: String!
    department: String!
    email: String!
    phoneNumber: String!
    staffId: String!
    officialEmail: String!
    avatar:String
    attendance: [AttendanceInput!]
    leaveBalance: Int
    tasks: [TaskInput!]
    performance: [PerformanceMetricInput!]
  }

  input EmployeeLoginInput {
    officialEmail:String
    staffId:String
    password:String!
  }
  
  type Query {
    getEmployee(staffId: String!): Employee
    getAllEmployees: [Employee]
  }
  
  type Mutation {
    createEmployee(input: EmployeeInput!): Employee
    firstTimeLogin(officialEmail:String!, password:String!):Employee
    updatePassword(id:ID!, password:String!):Employee
    loginEmployee(input:EmployeeLoginInput):Employee
    updateAvatar(avatar:String!):Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
  }
  `;
