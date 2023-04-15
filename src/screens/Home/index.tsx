import React from "react";
import { FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from "~/components/Header";
import Input from "~/components/Input";
import Task from "~/components/Task";
import TaskMetric from "~/components/TaskMetric";
import theme from "~/theme/theme";
import Divider from "~/components/Divider";
import EmptyList from "~/components/EmptyList";
import useHomeViewModel from "./view.model";

import { Body, Container, Info } from "./styles";

export default function Home() {
  const {
    taskTitle,
    setTaskTitle,
    tasks,
    addTask,
    confirmRemoveTask,
    inputRef,
    toogleTaskDone,
  } = useHomeViewModel();

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
          data={tasks.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Task
              title={item.title}
              done={item.done}
              onRemove={() => confirmRemoveTask(item)}
              onPress={() => toogleTaskDone(item)}
            />
          )}
        />
      </Body>
    </Container>
  );
}
