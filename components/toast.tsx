interface ToastProps {
  message: string;
  type: "success" | "error";
}

export const Toast = ({ message }: ToastProps): JSX.Element => (
  <div>{message}</div>
);
