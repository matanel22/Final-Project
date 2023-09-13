import mongoose from "mongoose";
import Joi from "joi";

const CompletedTaskScama = new mongoose.Schema({
  id: String,
  discription: String,
  statusTask: String,
});
const completedTasksModel = mongoose.model(
  "completed_tasks",
  CompletedTaskScama
);
export default completedTasksModel;
