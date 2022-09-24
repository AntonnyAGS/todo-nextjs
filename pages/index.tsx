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
import { TaskInput, UpdateTaskInput } from "./api/[[...task]]";
import { UpdateTaskModal } from "../components/update-modal";

const Home: NextPage = () => {
  const router = useRouter();
  const { notify } = useNotification();
  const { fetch, insert, update, remove } = useTasks();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const onSelectTask = (task: Task) => {
    setSelectedTask(task);
    setShowUpdateModal(true);
  };

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

  const updateTask = async (input: UpdateTaskInput) => {
    try {
      await update(input);
      setShowUpdateModal(false);
      loadTasks();
    } catch (err) {
      const data = (err as HttpError)?.response?.data;

      if (data) {
        notify(data.message as string, "error");

        return;
      }

      notify("Erro desconhecido ao atualizar tarefa", "error");
    }
  };

  const createTask = async (input: TaskInput) => {
    try {
      await insert(input);
      setShowCreateModal(false);
      loadTasks();
    } catch (err) {
      const data = (err as HttpError)?.response?.data;

      if (data) {
        notify(data.message as string, "error");

        return;
      }

      notify("Erro desconhecido ao cadastrar tarefa", "error");
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await remove(taskId);
      setShowUpdateModal(false);
      loadTasks();
    } catch (err) {
      const data = (err as HttpError)?.response?.data;

      if (data) {
        notify(data.message as string, "error");

        return;
      }

      notify("Erro desconhecido ao apagar tarefa", "error");
    }
  }

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
        <Header onClickAdd={() => setShowCreateModal(true)} />
        <main>
          <TaskFilter value={filters} setValue={setFilters} />
          <TaskList tasks={tasks} onSelectTask={onSelectTask} />
        </main>
        <Footer onClickAdd={() => setShowCreateModal(true)} />
        <CreateTaskModal
          show={showCreateModal}
          onClickClose={() => setShowCreateModal(false)}
          onSubmit={createTask}
        />
        <UpdateTaskModal
          task={selectedTask}
          show={showUpdateModal}
          onClickClose={() => {
            setShowUpdateModal(false);
            setSelectedTask({} as Task);
          }}
          onSubmit={updateTask}
          onRemove={removeTask}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
