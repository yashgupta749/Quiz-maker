import { set, Schema, model } from "mongoose";

set("useNewUrlParser", true);
set("useFindAndModify", false);
set("useCreateIndex", true);

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default model("User", userSchema);
