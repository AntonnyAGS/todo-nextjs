import styles from "../styles/components/TaskFilter.module.scss";
import { Select } from "./select";

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
      <Select
        value={value}
        variant='outline'
        onChange={(e) => setValue(e.target.value)}
        data={[
          { value: "all", label: "Todas" },
          { value: "active", label: "Ativas" },
          { value: "done", label: "Concluídas" },
        ]}
      />
    </div>
  );
};
