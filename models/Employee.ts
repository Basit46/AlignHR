import mongoose from "mongoose";

type SingleEmployee = {
  name: string;
  email: string;
  phoneNum: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  address: string;
  role: string;
  department: string;
  contractType: string;
  isOnLeave: boolean;
  basePay: number;
  addOns: number;
  taxId: string;
  bankName: string;
  accountNo: string;
  attendance: "present" | "absent" | "n/a";
  dateJoined: Date;
};

type EmployeeSchemaType = {
  userId: mongoose.Types.ObjectId;
  employees: SingleEmployee[];
};

const singleEmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phoneNum: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    gender: { type: String, default: "" },
    nationality: { type: String, default: "" },
    address: { type: String, default: "" },
    role: { type: String, default: "" },
    department: { type: String, default: "" },
    contractType: { type: String, default: "" },
    isOnLeave: { type: Boolean, default: false },

    basePay: { type: Number, default: 0 },
    addOns: { type: Number, default: 0 },
    taxId: { type: String, default: "" },
    bankName: { type: String, default: "" },
    accountNo: { type: String, default: "" },

    attendance: {
      type: String,
      enum: ["present", "absent", "n/a"],
      default: "n/a",
    },

    dateJoined: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const employeeSchema = new mongoose.Schema<EmployeeSchemaType>(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    employees: [singleEmployeeSchema],
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
