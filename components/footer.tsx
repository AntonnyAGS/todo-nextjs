import Image from "next/image";
import styles from "../styles/components/Footer.module.scss";

import Button from "./button";

export const Footer = ({
  onClickAdd,
}: {
  onClickAdd: () => void;
}): JSX.Element => {
  return (
    <footer>
      <div className={styles.mobile}>
        <Button fluid onClick={onClickAdd}>
          <Image src="/icons/add.svg" height="24px" width="24px" />
          <span>Adicionar uma tarefa</span>
        </Button>
      </div>

      <div className={styles.desktop}>
        © Copyright {new Date().getFullYear()}. Todos os direitos reservados.
      </div>
    </footer>
  );
};
