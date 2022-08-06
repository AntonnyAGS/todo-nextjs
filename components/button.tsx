import styles from "../styles/components/Button.module.scss";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fluid?: boolean;
}

const Button = ({ className, fluid, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      style={{ width: fluid ? "100%" : undefined }}
      className={
        className
          ? `${styles.defaultButton} ${className}`
          : styles.defaultButton
      }
    />
  );
};

export default Button;
