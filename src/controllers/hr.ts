import { Request, Response } from "express";
import resolvers from "../resolvers/hrResolver";

export const createHR = async (req: Request, res: Response) => {
  try {
    const existingHR = await resolvers.Query.getHR(null, req.body);
    if (existingHR) {
      return res.status(409).json("User already exists, login instead");
    }
    const newHR = await resolvers.Mutation.signupHR(null, req.body);
    return res
      .status(201)
      .json({ message: "User registered successfully", newHR });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const loginHR = async (req: Request, res: Response) => {
  try {
    const existingHR = await resolvers.Mutation.loginHR(null, req.body);
    if (!existingHR) {
      return res.status(404).json("User does not exist, kindly register");
    }
    return res
      .status(200)
      .json({ message: "User logged in successfully", existingHR });
  } catch (error) {
    return res.status(500).json(error);
  }
};
