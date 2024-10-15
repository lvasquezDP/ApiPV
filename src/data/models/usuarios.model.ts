import mongoose, { Schema } from "mongoose";

const userScrema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  img: {
    type: String,
    default: false,
  },
  ventas:{
    type:[Schema.Types.ObjectId],
    ref:'Ventas',
    required:false,
  },
  role: {
    type: [String],
    default: ["CLIENT_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE", "CLIENT_ROLE"],
  },
});


userScrema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret, options) {
   delete ret._id;
   delete ret.password;
  },
});

export const UserModel = mongoose.model("Usuarios", userScrema);
