import { NextPage } from "next";
import Head from "next/head";
import Img from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { useNotification } from "../hooks/use-notification";
import { fetch, HttpError } from "../services/http-client";
import styles from "../styles/Login.module.scss";

interface LoginResponse {
  email: string;
  name: string;
  token: string;
}

const Login: NextPage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { notify } = useNotification();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const body = { email, password };

      try {
        const { data } = await fetch<unknown, LoginResponse>("/login", "POST", {
          body,
        });
        const { email, name, token } = data;

        localStorage.setItem(
          "todo:user",
          JSON.stringify({ email, name, token })
        );

        router.push("/");
      } catch (err) {
        const data = (err as HttpError)?.response?.data;

        if (data) {
          notify(data.message as string, "error");

          return;
        }

        notify("Erro desconhecido ao logar", "error");
      }
    },
    [email, password]
  );

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
          layout="responsive"
          width={"100%"}
          height={"100%"}
        />
      </div>

      <div className={styles.containerRight}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            required
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
            onChange={({ target }) => setEmail(target.value)}
          />

          <Input
            required
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
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button fluid type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
