import { Task } from "../models/task.schema";
import { ListItem } from "./list-item";
import styles from "../styles/components/TaskList.module.scss";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps): JSX.Element => {
  return (
    <div className={styles.default}>
      {tasks.map((task) => (
        <ListItem task={task} key={task._id} selectTask={() => {}} />
      ))}
    </div>
  );
};
