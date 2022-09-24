import { useState } from "react";
import Button from "./button";
import Input from "./input";
import { CustomModal } from "./modal";
import styles from "../styles/components/CreateModal.module.scss";
import { TaskInput } from "../pages/api/[[...task]]";
import { delay } from "../utils/delay";

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
    delay(dispose);
  };

  const dispose = () => {
    setTitle("");
    setPrevisionDate("");
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
          <Button onClick={handleSubmit}>Salvar</Button>
          <span onClick={onClose} style={{ cursor: "pointer" }}>
            Cancelar
          </span>
        </div>
      }
    >
      <div className={styles.body}>
        <h3>Criar tarefa</h3>

        <div>
          <label>Tarefa</label>
          <Input
            variant="outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Data de previsão de conclusão</label>
          <Input
            value={previsionDate}
            variant="outline"
            type="date"
            onChange={(e) => setPrevisionDate(e.target.value)}
          />
        </div>
      </div>
    </CustomModal>
  );
};
