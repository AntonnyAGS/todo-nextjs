import { useEffect, useState } from "react";
import {
  NotificationType,
  useNotificationContext,
} from "../contexts/notification.context";

export const useNotification = () => {
  const { showNotification, setShowNotification, setMessage, setType } =
    useNotificationContext();

  let timeout: NodeJS.Timeout;

  const notify = (message: string, type?: NotificationType) => {
    setMessage(message);
    setType(type ?? "success");

    setShowNotification(true);
  };

  useEffect(() => {
    timeout = setTimeout(() => {
      setShowNotification(false);
    }, 10 * 1000);
  }, [showNotification]);

  useEffect(() => {
    setMessage("");
    setShowNotification(false);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return { notify };
};
