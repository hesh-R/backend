import { EmployeeModel, Employee, OtpModel } from "../models/employee";
import bcrypt from "bcryptjs";
import { generateToken, sendOTP } from "../utils/validation";

export const employeeResolvers = {
  Query: {
    getEmployee: async (_: any, staffId: Employee) => {
      return await EmployeeModel.findOne({ staffId });
    },
    getAllEmployees: async () => {
      return await EmployeeModel.find().exec();
    },
  },
  Mutation: {
    createEmployee: async (_: any, args: Employee) => {
      const input = args;
      const newEmployee = new EmployeeModel(input);
      const savedUser = await newEmployee.save();
      await sendOTP(
        savedUser.email,
        savedUser.password,
        savedUser.officialEmail,
        savedUser.staffId
      );
      return savedUser;
    },

    firstTimeLogin: async (_: any, args: Employee) => {
      try {
        const { officialEmail, password } = args;
        const newEmployee = await EmployeeModel.findOne({
          officialEmail,
          password,
        });
        if (!newEmployee) {
          return null;
        }
        const token = generateToken(officialEmail, newEmployee.staffId);
        return { newEmployee, token };
      } catch (error) {
        throw new Error(error);
      }
    },

    updatePassword: async (_: any, input: Employee) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(input.password, salt);
      const existingEmployee = await EmployeeModel.findOneAndUpdate(
        { staffId: input.staffId },
        { password: hashedPassword },
        { new: true }
      );
      if (!existingEmployee) {
        throw new Error("User not found, kindly register");
      }
      return existingEmployee;
    },

    loginEmployee: async (_: any, args: Employee) => {
      try {
        const { staffId, officialEmail, password } = args;
        const existingEmployee = staffId
          ? await EmployeeModel.findOne({ staffId })
          : await EmployeeModel.findOne({ officialEmail });
        const isValidPassword = await bcrypt.compare(
          password,
          existingEmployee.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid credentials");
        }
        const token = generateToken(officialEmail, staffId);
        return { existingEmployee, token };
      } catch (error) {
        throw new Error(error);
      }
    },

    updateAvatar: async (_: any, args: Employee) => {
      const { officialEmail, avatar } = args;
      const requiredEmployee = await EmployeeModel.findOneAndUpdate(
        { officialEmail },
        { avatar },
        { new: true }
      );
      if (!requiredEmployee) {
        throw new Error("Employee not found");
      }
      return requiredEmployee;
    },
  },
};
