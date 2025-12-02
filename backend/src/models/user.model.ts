import { Schema, model, Model } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";

const UserSchema = new Schema<UserInterface>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { versionKey: false, timestamps: true })

const User: Model<UserInterface> = model("User", UserSchema);

export { User }