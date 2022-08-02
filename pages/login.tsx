import { NextPage } from "next";
import Head from "next/head";
import Img from "next/image";
import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login - Todo App</title>
      </Head>
      <div className={styles.containerLeft}>
        <Img
          className={styles.logo}
          src="/logo.svg"
          alt="Logo FIAP"
          width="100%"
          height="50px"
        />
      </div>

      <div className={styles.containerRight}>
        <div className={styles.innerContainer}>
          <Input
            placeholder="Email"
            type="email"
            prependIcon={
              <Img
                src={"/icons/mail.svg"}
                width="24px"
                height="24px"
                alt="Email icon"
              />
            }
          />

          <Input
            placeholder="Senha"
            type={isPasswordVisible ? "text" : "password"}
            prependIcon={
              <Img
                src={"/icons/lock.svg"}
                width="24px"
                height="24px"
                alt="Email icon"
              />
            }
            appendInner={
              <Img
                src={"/icons/eye.svg"}
                width="24px"
                height="24px"
                alt="Email icon"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            }
          />

          <Button fluid>Entrar</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
