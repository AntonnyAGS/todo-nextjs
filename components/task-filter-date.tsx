import styles from "../styles/components/TaskFilter.module.scss";
import Input from "./input";

interface TaskFilterItemDate {
  setValue: (value: string) => void;
  value?: string;

  title: string;
}

export const TaskFilterItemDate = ({
  title,
  value,
  setValue,
}: TaskFilterItemDate): JSX.Element => {
  return (
    <div className={styles.filterItem}>
      <label>{title}</label>
      <Input
        type="date"
        variant="outline"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
