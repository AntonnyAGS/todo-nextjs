import Img from "next/image";
import styles from "../styles/components/Header.module.scss";
import Button from "./button";

export const Header = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <Img
        className={styles.logo}
        src="/logo.svg"
        alt="Logo FIAP"
        width="100%"
        height="50px"
      />
      <Button>
        <span>+</span>Adicionar tarefa
      </Button>
      <div className={styles.rightContainerMobile}>
        <span>Olá</span>
        <Img
          className={styles.logo}
          src="/icons/exit-mobile.svg"
          alt="Logo FIAP"
          width="24px"
          height="24px"
        />
      </div>
      <div className={styles.rightContainerDesktop}> desktop </div>
    </header>
  );
};
