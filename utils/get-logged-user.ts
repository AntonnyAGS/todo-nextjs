import { User } from "../models/user.entity";

export const getLoggedUser = (): User | null => {
  const user = localStorage.getItem("todo:user");

  if (!user) return null;

  const data = JSON.parse(user) as User;

  return data;
};
