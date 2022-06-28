import { Schema, models, model, Model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel =
  (models.users as Model<IUser>) || model<IUser>("users", UserSchema);
