import { NextPage } from "next";
import Head from "next/head";
import Img from "next/image";
import Button from "../components/button";
import Input from "../components/input";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login - Todo App</title>
      </Head>

      <div className={styles.login}>
        <Img
          className={styles.logo}
          src="/logo.svg"
          alt="logo"
          width="100%"
          height="50px"
        />

        <Input placeholder="Email" />

        <Input placeholder="Senha" />

        <Button>Entrar</Button>
      </div>

      <div></div>
    </div>
  );
};

export default Login;
