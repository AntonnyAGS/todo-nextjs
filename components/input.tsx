import styles from "../styles/components/Input.module.css";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = ({ className, ...props }: InputProps): JSX.Element => {
  return (
    <input
      {...props}
      className={
        className ? `${styles.defaultInput} ${className}` : styles.defaultInput
      }
    />
  );
};

export default Input;
