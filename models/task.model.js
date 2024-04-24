import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

let TaskSchema = new Schema({
  login_id: { type: _Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, max: 100 },
  completed: { type: Boolean, required: true },
  date: { type: Date, required: true },
});

// Export the model
export default model("Task", TaskSchema);
