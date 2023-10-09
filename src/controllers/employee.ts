import { Request, Response } from "express";
import { employeeResolvers } from "../resolvers/employeeResolvers";
import { Employee } from "../models/employee";
import { hrResolvers } from "../resolvers/hrResolver";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.body;
    const existingEmployee = await employeeResolvers.Query.getEmployee(
      null,
      staffId
    );
    if (existingEmployee) {
      return res
        .status(409)
        .json(`Employee with employeeId:${staffId} already exists`);
    }
    const newEmployee = await employeeResolvers.Mutation.createEmployee(null, {
      ...req.body,
      password: Math.floor(Math.random() * 9000) + 1000,
    });
    return res
      .status(201)
      .json({ message: "New Employee registered successfully", newEmployee });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const firstLogin = async (req: Request, res: Response) => {
  try {
    const existingEmployee = await employeeResolvers.Mutation.firstTimeLogin(
      null,
      req.body
    );
    if (existingEmployee.password.length === 4) {
      return res.status(403).json({ message: "Kindly update your password" });
    }
    return res
      .status(200)
      .json({ message: "User already exists, kindly login" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const recordToUpdate = await employeeResolvers.Mutation.updatePassword(
      null,
      { ...req.params, ...req.body }
    );
    if (!recordToUpdate) {
      return res.status(404).json("Staff not found, kindly register");
    }
    return res
      .status(200)
      .json({ message: "Password updated successfully", recordToUpdate });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginEmployee = async (req: Request, res: Response) => {
  try {
    const validUser = await employeeResolvers.Mutation.loginEmployee(
      null,
      req.body
    );
    if (!validUser) {
      return res.status(404).json("User not found, kindly register");
    }
    return res
      .status(200)
      .json({ message: "User logged in successfully", validUser });
  } catch (error) {
    res.status(500).json(error);
  }
};
