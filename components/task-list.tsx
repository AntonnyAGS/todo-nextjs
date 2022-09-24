import { Task } from "../models/task.schema";
import { ListItem } from "./list-item";
import styles from "../styles/components/TaskList.module.scss";

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (value: Task) => void;
}

export const TaskList = ({
  tasks,
  onSelectTask,
}: TaskListProps): JSX.Element => {
  return (
    <div className={styles.default}>
      {tasks.map((task) => (
        <ListItem task={task} key={task._id} selectTask={onSelectTask} />
      ))}
    </div>
  );
};
