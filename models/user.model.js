import { Schema as _Schema, model } from "mongoose";

import joi from "joi";
import jsonwebtoken from "jsonwebtoken";

const { string, validate } = joi;
const { sign } = jsonwebtoken;

const Schema = _Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  isAdmin: Boolean,
});

UserSchema.methods.generateAuthToken = function () {
  const token = sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.MYPRIVATEKEY
  );
  return token;
};

export const User = model("User", UserSchema);

export function validateUser(user) {
  const schema = {
    name: string().min(3).max(50).required(),
    email: string().min(5).max(255).required().email().lowercase(),
    password: string().min(3).max(255).required(),
  };

  return validate(user, schema);
}
