import { EmployeeModel, Employee } from "../models/employee";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const employeeResolvers = {
  Query: {
    getEmployee: async (_: any, { staffId }: Employee) => {
      return await EmployeeModel.findById(staffId);
    },
    getAllEmployees: async () => {
      return await EmployeeModel.find().exec();
    },
  },
  Mutation: {
    createEmployee: async (_: any, args: Employee) => {
      const input = args;
      const newEmployee = new EmployeeModel(input);
      const savedUser = newEmployee.save();
      return savedUser;
    },

    firstTimeLogin: async (_: any, args: Employee) => {
      try {
        const { email, staffId } = args;
        const newEmployee = email
          ? await EmployeeModel.findOne({ email })
          : await EmployeeModel.findOne({ staffId });
        return newEmployee;
      } catch (error) {
        throw new Error(error);
      }
    },

    updatePassword: async (_id: any, input: Employee) => {
      const existingEmployee = await EmployeeModel.findOneAndUpdate(
        { staffId: input.staffId },
        { password: input.password },
        { new: true }
      );
      if (!existingEmployee) {
        throw new Error("User not found, kindly register");
      }
      return existingEmployee;
    },

    loginEmployee: async (_: any, args: Employee) => {
      try {
        const { staffId, email, password } = args;
        const existingEmployee = staffId
          ? await EmployeeModel.findOne({ staffId }, { password })
          : await EmployeeModel.findOne({ email }, { password });
        const isValidPassword = await bcrypt.compare(
          password,
          existingEmployee.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }
        const token = jwt.sign(
          { email: existingEmployee.email, staffId: existingEmployee.staffId },
          "secretKey",
          {
            expiresIn: "1h",
          }
        );

        return { existingEmployee, token };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
