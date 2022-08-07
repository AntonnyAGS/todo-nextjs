import { Schema, models, model, Model, ObjectId } from "mongoose";
interface ITask {
  name: string;
  userId: string;
  previsionDate: Date;
  finishDate: Date;
}

export interface Task extends ITask {
  _id: string;
}

const TaskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  previsionDate: { type: Date, required: true },
  finishDate: { type: Date, required: false },
});

export const TaskModel =
  (models.tasks as Model<ITask>) || model<ITask>("tasks", TaskSchema);
