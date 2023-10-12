import { OtpModel, OtpInfo } from "../models/employee";

export const otpResolvers = {
  Mutation: {
    generateOtp: async (_: any, args: OtpInfo) => {
      const input = args;
      const newOtp = new OtpModel(input);
      await newOtp.save();
      return newOtp;
    },

    verifyOtp: async (_: any, args: { otp: string }) => {
      const input = args;
      await OtpModel.findOneAndDelete({
        otp: Number(input.otp),
      });
    },
  },
};
