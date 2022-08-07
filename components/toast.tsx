import { CSSProperties } from "react";
import styles from "../styles/components/Toast.module.scss";

interface ToastProps {
  message: string;
  type: "success" | "error" | "warning";
  style: CSSProperties;
  onClick?: () => void;
}

const titleMapper: Record<string, string> = {
  success: "SUCESSO",
  waring: "AVISO",
  error: "ERRO",
};

export const Toast = ({
  message,
  style,
  type,
  onClick,
}: ToastProps): JSX.Element => (
  <div
    className={`${styles.container} ${styles[type]}`}
    style={style}
    onClick={onClick}
  >
    <div className={styles.title}>{titleMapper[type]}</div>
    {message}
  </div>
);
