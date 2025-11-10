import mongoose from "mongoose";

type UserSchemaType = {
  orgName: string;
  fullName: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<UserSchemaType>(
  {
    orgName: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
