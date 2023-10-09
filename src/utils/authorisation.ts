import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Employee, EmployeeModel } from "../models/employee";
import { HRModel } from "../models/hr";
const jwtSecret = process.env.JWT_SECRET as string;

export const isEmployee = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userDetails = jwt.verify(token, jwtSecret);
    const existingEmployee = await EmployeeModel.findOne({
      staffId: userDetails["staffId"],
    });
    if (!existingEmployee) {
      return res.status(404).json("User not found");
    }
    req.user = userDetails;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

export const isHr = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userDetails = jwt.verify(token, jwtSecret);
    const existingHr = await HRModel.findOne({
      staffId: userDetails["staffId"],
    });
    if (!existingHr) {
      return res.status(404).json("User not found");
    }
    req.user = userDetails;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
