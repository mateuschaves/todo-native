import { useRef, useState } from 'react';
import { Alert, Keyboard, TextInput } from 'react-native';
import ITask from '~/common/models/client';

const useHomeViewModel = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [taskTitle, setTaskTitle] = useState("");
  
    const inputRef = useRef<TextInput>(null);
  
    function addTask() {
      if (!String(taskTitle).trim()) return 

      const newTask = {
        id: tasks.length + 1,
        title: taskTitle,
        done: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle("");
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

    return {
        tasks,
        taskTitle,
        setTaskTitle,
        addTask,
        toogleTaskDone,
        confirmRemoveTask,
        inputRef,
        removeTask,
        tasksDone: tasks.filter((task) => task.done).length || 0,
    }
}

export default useHomeViewModel;