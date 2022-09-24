import Img from "next/image";
import { useSession } from "../hooks/use-session";
import styles from "../styles/components/Header.module.scss";
import Button from "./button";

export const Header = ({
  onClickAdd,
}: {
  onClickAdd: () => void;
}): JSX.Element => {
  const { loggedUser, logout } = useSession();

  return (
    <header className={styles.header}>
      <Img
        className={styles.logo}
        src="/logo.svg"
        alt="Logo FIAP"
        width="100%"
        height="50px"
      />
      <Button onClick={onClickAdd}>
        <span>+</span>Adicionar tarefa
      </Button>
      <div className={styles.rightContainerMobile}>
        <span>Olá, {loggedUser?.name} </span>
        <Img
          className={styles.logo}
          src="/icons/exit-mobile.svg"
          alt="Logo FIAP"
          width="24px"
          height="24px"
          onClick={logout}
        />
      </div>
      {/* <div className={styles.rightContainerDesktop}> desktop </div> */}
    </header>
  );
};
