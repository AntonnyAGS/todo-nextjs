import styles from "../styles/components/TaskFilter.module.scss";

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
      <input
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
