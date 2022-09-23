import styles from "../styles/components/ListItem.module.scss";
import { Task } from "../models/task.schema";
import dayjs from "../utils/date";

interface ListItemProps {
  task: Task;
  selectTask: (task: Task) => void;
}

export const ListItem = ({ task }: ListItemProps): JSX.Element => {
  const generateDate = (previsionDate: Date, finishDate?: Date) => {
    if (finishDate) {
      return `Concluída em: ${dayjs(finishDate).format("DD/MM/YYYY")}`;
    }

    console.log(previsionDate);

    return `Previsão de conclusão em: ${dayjs(previsionDate)
      .utc()
      .format("DD/MM/YYYY")}`;
  };

  return (
    <div
      className={`${task.finishDate ? styles.active : styles.finished} ${
        styles.default
      }`}
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
