import { createContext, useContext, useState } from "react";

interface NotificationContextProps {}

const NotificationContext = createContext<NotificationContextProps>({});
export const useNotificationContext = useContext(NotificationContext);

export const NotificationProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};
