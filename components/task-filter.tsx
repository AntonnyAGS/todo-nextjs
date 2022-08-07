import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles/components/TaskFilter.module.scss";
import { TaskFilterItemDate } from "./task-filter-date";
import { TaskFilterStatus } from "./task-filter-status";

export interface Filters {
  startDate: string;
  endDate: string;
}

interface FiltersProps {
  value: Filters;
  setValue: Dispatch<SetStateAction<Filters>>;
}

export const TaskFilter = ({ value, setValue }: FiltersProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFiltersChange = (key: keyof Filters, data: string) => {
    const obj = { ...value };

    obj[key] = data;

    setValue(obj);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>Tarefas</span>
        <img
          src="/icons/filter.svg"
          alt="Filtros"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {isOpen && (
        <div className={styles.formMobile}>
          <TaskFilterItemDate
            title="Data de prevista de conclusão:"
            setValue={(value) => handleFiltersChange("startDate", value)}
          />
          <TaskFilterItemDate
            title="até:"
            setValue={(value) => {
              console.log(value);
            }}
          />
          <TaskFilterStatus setValue={(value) => console.log(value)} />
        </div>
      )}

      <div className={styles.form}>
        <TaskFilterItemDate
          title="Data de prevista de conclusão:"
          setValue={(value) => handleFiltersChange("startDate", value)}
        />
        <TaskFilterItemDate
          title="até:"
          setValue={(value) => {
            console.log(value);
          }}
        />
        |
        <TaskFilterStatus setValue={(value) => console.log(value)} />
      </div>
    </div>
  );
};
