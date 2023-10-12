export const otpTypeDefs = `#graphql

type OTP {
    userId: String
    otp: Float
    expiry: String
  }

input otpInput {
    userId: String
    otp: Float
    expiry: String
  }

type Mutation {
    generateOtp(input:otpInput):OTP
    verifyOtp(otp:Float):OTP
  }

`;
