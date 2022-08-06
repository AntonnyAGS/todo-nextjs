import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getLoggedUser } from "../utils/get-logged-user";
import { useMounted } from "../hooks/use-mounted";
import styles from "../styles/Home.module.scss";
import { Footer, Header } from "../components";
import Head from "next/head";

const Home: NextPage = () => {
  const { isMounted } = useMounted();
  const router = useRouter();

  if (isMounted) {
    const user = getLoggedUser();
    !user && router.push("/login");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo - Home</title>
      </Head>
      <Header />
      <Footer />
    </div>
  );
};

export default Home;
