import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "../models/user.entity";
import { getLoggedUser } from "../utils/get-logged-user";
import { logout as _logout } from "../utils/logout";

export const useSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [logout, setLogout] = useState<() => void>();

  const { push } = useRouter();

  useEffect(() => {
    setUser(getLoggedUser());
    setLogout(() => () => {
      _logout();
      push("/login");
    });
  }, []);

  return { loggedUser: user, logout };
};
