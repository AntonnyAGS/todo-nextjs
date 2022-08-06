import { Schema, models, model, Model } from "mongoose";

interface ITask {
  name: string;
  email: string;
  userId: string;
  previsionDate: Date;
  finishDate: Date;
}

const TaskSchema = new Schema<ITask>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  previsionDate: { type: Date, required: true },
  finishDate: { type: Date, required: false },
});

export const TaskModel =
  (models.users as Model<ITask>) || model<ITask>("tasks", TaskSchema);
