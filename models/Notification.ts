import mongoose from "mongoose";

type NotificationSchemaType = {
  userId: mongoose.Types.ObjectId;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
};

const notificationSchema = new mongoose.Schema<NotificationSchemaType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
