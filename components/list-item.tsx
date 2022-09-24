import styles from "../styles/components/ListItem.module.scss";
import { Task } from "../models/task.schema";
import dayjs from "../utils/date";

interface ListItemProps {
  task: Task;
  selectTask: (task: Task) => void;
}

export const ListItem = ({ task, selectTask }: ListItemProps): JSX.Element => {
  const generateDate = (previsionDate: Date, finishDate?: Date) => {
    if (finishDate) {
      return `Concluída em: ${dayjs(finishDate).utc().format("DD/MM/YYYY")}`;
    }

    return `Previsão de conclusão em: ${dayjs(previsionDate)
      .utc()
      .format("DD/MM/YYYY")}`;
  };

  return (
    <div
      className={`${task.finishDate ? styles.finished : styles.active} ${
        styles.default
      }`}
      onClick={() => selectTask(task)}
    >
      <img
        src={task.finishDate ? "/icons/checked.svg" : "/icons/not-checked.svg"}
        alt="Tarefa"
      />
      <div>
        <p>{task.name}</p>
        <span>{generateDate(task.previsionDate, task.finishDate)}</span>
      </div>
    </div>
  );
};
