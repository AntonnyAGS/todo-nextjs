import { useState } from "react";
import Button from "./button";
import Input from "./input";
import { CustomModal } from "./modal";
import styles from "../styles/components/CreateModal.module.scss";
import { TaskInput } from "../pages/api/task";

interface CreateTaskModalProps {
  show: boolean;
  onClickClose: () => void;
  onSubmit: (value: TaskInput) => void;
}

export const CreateTaskModal = ({
  show,
  onClickClose,
  onSubmit,
}: CreateTaskModalProps): JSX.Element => {
  const [title, setTitle] = useState("");
  const [previsionDate, setPrevisionDate] = useState("");

  const handleSubmit = () => {
    if (!title || !previsionDate) {
      return;
    }

    onSubmit({ name: title, previsionDate: new Date(previsionDate) });
  };

  return (
    <CustomModal
      show={show}
      onClickClose={onClickClose}
      footer={
        <div className={styles.footer}>
          <Button onClick={handleSubmit}>Salvar</Button>
          <span onClick={onClickClose}>Cancelar</span>
        </div>
      }
    >
      <div className={styles.body}>
        <h3>Criar tarefa</h3>

        <div>
          <label>Tarefa</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Data previsão</label>
          <Input
            value={previsionDate}
            type="date"
            onChange={(e) => setPrevisionDate(e.target.value)}
          />
        </div>
      </div>
    </CustomModal>
  );
};
