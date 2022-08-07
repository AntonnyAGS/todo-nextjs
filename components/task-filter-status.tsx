import styles from "../styles/components/TaskFilter.module.scss";

interface TaskFilterItemStatus {
  setValue: (value: string) => void;
  value?: string;
}

export const TaskFilterStatus = ({
  value,
  setValue,
}: TaskFilterItemStatus): JSX.Element => {
  return (
    <div className={styles.filterItem}>
      <label>Status</label>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="all">Todas</option>
        <option value="active">Ativas</option>
        <option value="done">Concluídas</option>
      </select>
    </div>
  );
};
