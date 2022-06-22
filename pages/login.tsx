import { NextPage } from "next";
import Head from "next/head";
import Input from "../components/input";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login - Todo App</title>
      </Head>

      <div>
        <Input />
      </div>

      <div>
        
      </div>

    </div>
  );
};

export default Login;
