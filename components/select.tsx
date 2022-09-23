import styles from "../styles/components/Select.module.scss";

interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  data: SelectItem[];
  variant?: "outline" | "default";
}

export const Select = ({
  data,
  className,
  variant = "default",
  ...props
}: SelectProps) => {
  return (
    <div className={styles.container}>
      <select
        {...props}
        className={
          className ? `${styles[variant]} ${className}` : styles[variant]
        }
      >
        {data.map((item) => (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
