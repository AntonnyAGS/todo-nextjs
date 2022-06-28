import styles from "../styles/components/Button.module.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button = ({ className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className={
        className ? `${styles.defaultButton} ${className}` : styles.defaultButton
      }
    />
  );
};

export default Button;
