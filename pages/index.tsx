import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getLoggedUser } from "../utils/get-logged-user";
import styles from "../styles/Home.module.scss";
import { Filters, Footer, Header, TaskFilter } from "../components";
import Head from "next/head";
import { HttpError } from "../services/http-client";
import { Task } from "../models/task.schema";
import { useEffect, useState } from "react";
import { useNotification } from "../hooks/use-notification";
import { TaskList } from "../components/task-list";
import { ClientOnly } from "../components/client-only";
import { CreateTaskModal } from "../components/create-modal";
import { useTasks } from "../hooks/use-tasks";

const Home: NextPage = () => {
  const router = useRouter();
  const { notify } = useNotification();
  const { fetch } = useTasks();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [showModal, setShowModal] = useState(false);

  const loadTasks = async () => {
    try {
      const data = await fetch(filters);

      setTasks(data);
    } catch (err) {
      const data = (err as HttpError)?.response?.data;

      if (data) {
        notify(data.message as string, "error");

        return;
      }

      notify("Erro desconhecido ao recuperar lista de tarefas", "error");
    }
  };

  const createTask = async () => {
    try {
    } catch (err) {}
  };

  useEffect(() => {
    const user = getLoggedUser();

    if (!user) {
      router.push("/login");
    } else {
      loadTasks();
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [filters]);

  return (
    <ClientOnly>
      <div className={styles.container}>
        <Head>
          <title>Todo - Home</title>
        </Head>
        <Header onClickAdd={() => setShowModal(true)} />
        <main>
          <TaskFilter value={filters} setValue={setFilters} />
          <TaskList tasks={tasks} />
        </main>
        <Footer onClickAdd={() => setShowModal(true)} />
        <CreateTaskModal
          show={showModal}
          onClickClose={() => setShowModal(false)}
          onSubmit={() => {}}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
