import { Task } from "../models/task.schema";
import { TaskInput, UpdateTaskInput } from "../pages/api/[[...task]]";
import { fetch as _fetch } from "../services/http-client";

export const useTasks = () => {
  const fetch = async (
    params: {
      startDate?: string;
      endDate?: string;
      status?: "all" | "active" | "done";
    } = {}
  ): Promise<Task[]> => {
    const urlParams = new URLSearchParams(params);
    const { data } = await _fetch<unknown, Task[]>(
      `/task?${urlParams.toString()}`,
      "GET"
    );

    return data;
  };

  const insert = async (input: TaskInput): Promise<Task> => {
    const { data } = await _fetch<TaskInput, Task>("/task", "POST", {
      body: input,
    });

    return data;
  };

  const update = async (input: UpdateTaskInput): Promise<Task> => {
    const { data } = await _fetch<TaskInput, Task>("/task", "PUT", {
      body: input,
    });

    return data;
  };

  const remove = async (taskId: string): Promise<void> => {
    await _fetch<void, void>(`/task/${taskId}`, "DELETE");
  };

  return { fetch, insert, update, remove };
};
