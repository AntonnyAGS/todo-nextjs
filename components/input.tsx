import styles from "../styles/components/Input.module.scss";

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
        <span>{appendInner}</span>
      </div>
    </div>
  );
};

export default Input;
