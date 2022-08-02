import styles from "../styles/components/Input.module.css";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  prependIcon?: JSX.Element;
  appendInner?: JSX.Element;
}

const Input = ({
  className,
  prependIcon,
  appendInner,
  ...props
}: InputProps): JSX.Element => {
  return (
    <div className={styles.defaultInputContainer}>
      {prependIcon}
      <div className={styles.defaultInputWrapper}>
        <input
          {...props}
          className={
            className
              ? `${styles.defaultInput} ${className}`
              : styles.defaultInput
          }
        />
        {appendInner}
      </div>
    </div>
  );
};

export default Input;
