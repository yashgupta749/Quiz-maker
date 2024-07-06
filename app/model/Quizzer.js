import { set, Schema, model } from "mongoose";

set("useNewUrlParser", true);
set("useFindAndModify", false);
set("useCreateIndex", true);

const quizzerSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  quizCurated: {
    type: Number,
    default: 0,
  },
  quizAttended: {
    type: Number,
    default: 0,
  },
  quizFlawless: {
    type: Number,
    default: 0,
  },
});

export default model("Quizzer", quizzerSchema);
