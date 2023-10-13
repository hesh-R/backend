import { Document, Schema, Types, model } from "mongoose";

interface Attendance {
  date: Date;
  isPresent: boolean;
}

enum Status {
  PENDING = "pending",
  INPROGRESS = "in progress",
  COMPLETE = "completed",
}

enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

interface Task {
  description: string;
  deadline: Date;
  priority: Priority;
  status: Status;
}

interface PerformanceMetric {
  goal: string;
  achievement: string;
}

export interface Employee extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  staffId: string;
  officialEmail: string;
  position: string;
  department: string;
  avatar: string;
  attendance: Attendance[];
  leaveBalance: number;
  tasks: Task[];
  performance: PerformanceMetric[];
}

const employeeSchema: Schema<Employee> = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  staffId: { type: String, required: true, unique: true },
  officialEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  attendance: [
    {
      date: { type: Date, required: true },
      isPresent: { type: Boolean, required: true },
    },
  ],
  leaveBalance: { type: Number },
  tasks: [
    {
      description: { type: String, required: true },
      deadline: { type: Date, required: true },
      priority: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
  performance: [
    {
      goal: { type: String, required: true },
      achievement: { type: String, required: true },
    },
  ],
});

export const EmployeeModel = model<Employee>("Employee", employeeSchema);

export interface OtpInfo extends Document {
  userId: string;
  otp?: number;
  expiry?: Date;
}

const otpSchema: Schema<OtpInfo> = new Schema({
  userId: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
  expiry: { type: Date },
});

export const OtpModel = model<OtpInfo>("Otp", otpSchema);
