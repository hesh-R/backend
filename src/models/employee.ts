import mongoose, { Document, Schema } from "mongoose";

interface Attendance {
  date: Date;
  isPresent: boolean;
}

interface Task {
  description: string;
  deadline: Date;
  priority: string;
  status: string;
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

export const EmployeeModel = mongoose.model<Employee>(
  "Employee",
  employeeSchema
);
