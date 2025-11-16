export type NotificationType = {
  _id: string;
  type: string;
  title: string;
  createdAt: string;
  message: string;
  isRead: boolean;
};

export type EmployeeType = {
  _id?: string;
  name?: string;
  email?: string;
  phoneNum?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  address?: string;
  role?: string;
  department?: string;
  contractType?: string;
  isOnLeave?: boolean;
  basePay?: number;
  addOns?: number;
  taxId?: string;
  bankName?: string;
  accountNo?: string;
  attendance?: "present" | "absent" | "n/a";
  dateJoined?: Date;
};
