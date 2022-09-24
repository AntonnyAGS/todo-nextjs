import { useEffect, useState } from "react";
import Button from "./button";
import Input from "./input";
import { CustomModal } from "./modal";
import styles from "../styles/components/UpdateModal.module.scss";
import { UpdateTaskInput } from "../pages/api/[[...task]]";
import { Task } from "../models/task.schema";
import dayjs from "../utils/date";
import { delay } from "../utils/delay";

interface UpdateTaskModalProps {
  show: boolean;
  task: Task;
  onClickClose: () => void;
  onSubmit: (value: UpdateTaskInput) => void;
  onRemove: (value: string) => void;
}

export const UpdateTaskModal = ({
  show,
  task,
  onClickClose,
  onSubmit,
  onRemove,
}: UpdateTaskModalProps): JSX.Element => {
  const [title, setTitle] = useState<string>();
  const [previsionDate, setPrevisionDate] = useState<string>();
  const [finishDate, setFinishDate] = useState<string>();

  useEffect(() => {
    setTitle(task.name);
    setPrevisionDate(dayjs(task.previsionDate).utc().format("YYYY-MM-DD"));

    task.finishDate &&
      setFinishDate(dayjs(task.finishDate).utc().format("YYYY-MM-DD"));
  }, [task]);

  const handleSubmit = () => {
    if (!title || !previsionDate) {
      return;
    }

    onSubmit({
      id: task._id,
      name: title,
      previsionDate: new Date(previsionDate),
      finishDate: finishDate ? new Date(finishDate) : undefined,
    });

    delay(dispose);
  };

  const handleRemove = () => {
    onRemove(task._id);
    delay(dispose);
  };

  const dispose = () => {
    setTitle("");
    setPrevisionDate("");
    setFinishDate("");
  };

  const onClose = () => {
    onClickClose();
    dispose();
  };

  return (
    <CustomModal
      show={show}
      onClickClose={onClose}
      footer={
        <div className={styles.footer}>
          <span onClick={handleRemove} style={{ cursor: "pointer" }}>
            Apagar
          </span>
          <div>
            <Button onClick={handleSubmit}>Salvar</Button>
            <span onClick={onClose} style={{ cursor: "pointer" }}>
              Cancelar
            </span>
          </div>
        </div>
      }
    >
      <div className={styles.body}>
        <h3>Atualizar tarefa</h3>

        <div>
          <label>Tarefa</label>
          <Input
            variant="outline"
            value={title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Data de previsão de conclusão</label>
          <Input
            value={previsionDate ?? ""}
            variant="outline"
            type="date"
            onChange={(e) => setPrevisionDate(e.target.value)}
          />
        </div>

        <div>
          <label>Data de conclusão</label>
          <Input
            value={finishDate ?? ""}
            variant="outline"
            type="date"
            onChange={(e) => setFinishDate(e.target.value)}
          />
        </div>
      </div>
    </CustomModal>
  );
};
