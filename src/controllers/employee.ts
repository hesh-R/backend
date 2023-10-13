import { Request, Response } from "express";
import { employeeResolvers } from "../resolvers/employeeResolvers";
import { OtpModel } from "../models/employee";
import { generateOTP, isValidPassword, sendOTP } from "../utils/validation";
import { otpResolvers } from "../resolvers/otpResolvers";
import { uploadToCloudinary } from "../utils/cloudinary";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.body;
    const otpDetails = generateOTP();
    const existingEmployee = await employeeResolvers.Query.getEmployee(
      null,
      staffId
    );
    if (existingEmployee) {
      return res
        .status(409)
        .json(`Employee with staffId:${staffId} already exists`);
    }
    const employeeAvatar = req.file && (await uploadToCloudinary(req.file));
    const newEmployee = await employeeResolvers.Mutation.createEmployee(null, {
      ...req.body,
      password: otpDetails.otp,
      avatar: employeeAvatar,
    });
    const newOtp = new OtpModel({
      userId: newEmployee._id,
      otp: Number(newEmployee.password),
      expiry: otpDetails.expiry,
    });
    await otpResolvers.Mutation.generateOtp(null, newOtp);
    return res
      .status(201)
      .json({ message: "New Employee registered successfully" });
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
    if (!existingEmployee) {
      return res
        .status(404)
        .json(`User with official email: ${req.body.officialEmail} not found`);
    }
    await otpResolvers.Mutation.verifyOtp(null, {
      otp: existingEmployee.newEmployee.password,
    });
    return res.status(200).json({
      message: "User found, kindly update you password",
      existingEmployee,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatePassword = async (req: Request | any, res: Response) => {
  try {
    const { staffId } = req.user;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json("Passwords do not match");
    }
    const validPassword = isValidPassword(password);
    if (!validPassword) {
      return res.status(400).json("Invalid Password");
    }
    const recordToUpdate = await employeeResolvers.Mutation.updatePassword(
      null,
      { ...req.body, staffId }
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

export const updateEmployeeAvatar = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { email } = req.user;
    const newImageUrl = req.file && (await uploadToCloudinary(req.file));
    const input: any = {};
    input["email"] = email;
    input["avatar"] = newImageUrl;
    const updatedUser =
      newImageUrl &&
      (await employeeResolvers.Mutation.updateAvatar(null, input));
    if (!updatedUser) {
      return res.status(404).json(`User with email: ${email} not found`);
    }
    return res
      .status(200)
      .json({ message: "Avatar updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json(error);
  }
};
