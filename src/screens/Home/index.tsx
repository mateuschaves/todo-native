import React, { useRef, useState } from "react";

import { Body, Container, Info } from "./styles";
import Header from "~/components/Header";
import Input from "~/components/Input";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import Task from "~/components/Task";
import TaskMetric from "~/components/TaskMetric";
import theme from "~/theme/theme";
import Divider from "~/components/Divider";
import { StatusBar } from "expo-status-bar";
import EmptyList from "~/components/EmptyList";

interface ITask {
  id: number;
  title: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");

  const inputRef = useRef<TextInput>(null);

  function addTask() {
    if (!String(taskTitle).trim()) return 

    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      done: false,
    };

    setTaskTitle("");
    setTasks([...tasks, newTask]);
    Keyboard.dismiss();
  }

  function removeTask(taskSelected: ITask) {
    const newTasks = tasks.filter((task) => taskSelected.id !== task.id);
    setTasks(newTasks);
  }

  function toogleTaskDone(taskSelected: ITask) {
    const newTasks = tasks.map((task) => {
      if (taskSelected.id === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    setTasks(newTasks);
  }

  function confirmRemoveTask(taskSelected: ITask) {
    Alert.alert("Remover tarefa", "Tem certeza que deseja remover essa tarefa ?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => removeTask(taskSelected),
        style: "destructive",
      },
    ]);
  }

  const tasksDone = tasks.filter((task) => task.done).length;

  return (
    <Container>
      <StatusBar style="light" />
      <Header />
      <Body>
        <Input
          inputRef={inputRef}
          onPress={addTask}
          value={taskTitle}
          setValue={setTaskTitle}
        />
        <Info>
          <TaskMetric
            title="Criadas"
            badgeText={String(tasks.length)}
            titleColor={theme.colors.blue}
          />
          <TaskMetric
            title="Concluídas"
            badgeText={String(tasksDone)}
            titleColor={theme.colors.purple}
          />
        </Info>
        <Divider />
        {tasks.length === 0 && <EmptyList />}
        <FlatList
          data={tasks.sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1)}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Task title={item.title} done={item.done} onRemove={() => confirmRemoveTask(item)} onPress={() => toogleTaskDone(item)} />}
        />
      </Body>
    </Container>
  );
}
