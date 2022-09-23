import { Task } from "../models/task.schema";
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

  return { fetch };
};
