import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Toast } from "../components";
import { useMounted } from "../hooks/use-mounted";

export type NotificationType = "error" | "success";

interface NotificationContextProps {
  type: NotificationType;
  showNotification: boolean;
  message: string;

  setShowNotification: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<NotificationType>>;
}

const NotificationContext = createContext<NotificationContextProps>(
  {} as NotificationContextProps
);
export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [type, setType] = useState<NotificationType>("error");

  return (
    <NotificationContext.Provider
      value={{
        message,
        showNotification,
        type,
        setMessage,
        setShowNotification,
        setType,
      }}
    >
      {showNotification && (
        <Toast
          message={message}
          type={type}
          style={{ position: "absolute", top: 32, right: 32 }}
          onClick={() => setShowNotification(false)}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};
