import { HR, HRModel } from "../models/hr";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/validation";
const jwtSecret = process.env.JWT_SECRET as string;

export const hrResolvers = {
  Query: {
    getHR: async (
      _: any,
      { id, email, staffId }: { id?: string; email?: string; staffId?: string }
    ) => {
      const existingHR = id
        ? await HRModel.findById(id)
        : email
        ? await HRModel.findOne({ email })
        : staffId
        ? await HRModel.findOne({ staffId })
        : null;
      return existingHR;
    },
  },
  Mutation: {
    signupHR: async (_: any, input: HR) => {
      console.log(input);
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newHR = new HRModel({ ...input, password: hashedPassword });
      await newHR.save();
      return newHR;
    },
    loginHR: async (_: any, input: HR) => {
      const hr = await HRModel.findOne({
        $or: [{ email: input.email }, { staffId: input.staffId }],
      });
      if (!hr) {
        throw new Error("Invalid credentials");
      }
      const isValidPassword = await bcrypt.compare(input.password, hr.password);
      if (!isValidPassword) {
        throw new Error("Invalid credentials");
      }
      const token = generateToken(hr.email, hr.staffId);
      return { token, hr };
    },
  },
};

export default hrResolvers;
