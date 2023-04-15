import useHomeViewModel from "../view.model";
import { renderHook, waitFor, act } from '@testing-library/react-native'

import {Keyboard} from 'react-native'


describe('Home Screen', () => {
    beforeEach(() => {
        jest.resetModules()
    });
    
    it('should be abe to add a task', async () => {
        const task = {
            id: 1,
            title: 'new task',
            done: false
        }

        const {result} = renderHook(() => useHomeViewModel());

        act(() => {
            result.current.setTaskTitle('new task');
        })

        await waitFor(() => result.current.taskTitle === task.title)

        act(() => {
            result.current.addTask();
        })

        await waitFor(() => result.current.tasks.length === 1)

        expect(result.current.tasks[0]).toEqual(task)
    });

    it('should clean the title state after add a task', async () => {
        const {result} = renderHook(() => useHomeViewModel());

        act(() => {
            result.current.setTaskTitle('new task');
        })

        await waitFor(() => result.current.taskTitle === 'new task')

        act(() => {
            result.current.addTask();
        })

        await waitFor(() => result.current.taskTitle === '')

        expect(result.current.taskTitle).toBe('')
    })

    it('should not add a task with empty title', async () => {
        const {result} = renderHook(() => useHomeViewModel());

        act(() => {
            result.current.setTaskTitle('');
        })

        await waitFor(() => result.current.taskTitle === '')

        act(() => {
            result.current.addTask();
        })

        await waitFor(() => result.current.tasks.length === 0)

        expect(result.current.tasks.length).toBe(0)
    })

    it('should be able to remove a task', async () => {
        const {result} = renderHook(() => useHomeViewModel());

        act(() => {
            result.current.setTaskTitle('new task');
        })

        await waitFor(() => result.current.taskTitle === 'new task')

        act(() => {
            result.current.addTask();
        })

        await waitFor(() => result.current.tasks.length === 1)

        const [task] = result.current.tasks;

        // call the remove task function, not the confirmRemoveTask
        act(() => {
            result.current.removeTask(task);
        })

        await waitFor(() => result.current.tasks.length === 0)

        expect(result.current.tasks.length).toBe(0)
    })

    it('should be able to toogle a task', async () => {
        const {result} = renderHook(() => useHomeViewModel())

        act(() => {
            result.current.setTaskTitle('new task')
        })

        await waitFor(() => result.current.taskTitle === 'new task')

        act(() => {
            result.current.addTask()
        })

        await waitFor(() => result.current.tasks.length === 1)

        const [task] = result.current.tasks

        expect(task.done).toBe(false)

        act(() => {
            result.current.toogleTaskDone(task)
        })

        await waitFor(() => result.current.tasks[0].done === true)

        expect(result.current.tasks[0].done).toBe(true)
    })

    it('should dismiss keyboard after add a task', async () => {
        const keyboadSpy = jest.spyOn(Keyboard, 'dismiss')

        const {result} = renderHook(() => useHomeViewModel())

        act(() => {
            result.current.setTaskTitle('new task')
        })

        await waitFor(() => result.current.taskTitle === 'new task')

        expect(keyboadSpy).not.toHaveBeenCalled()

        act(() => {
            result.current.addTask()
        })

        await waitFor(() => result.current.tasks.length === 1)

        expect(keyboadSpy).toBeCalledTimes(1)
    })

    it('should be able to get the number of tasks done', async () => {
        const {result} = renderHook(() => useHomeViewModel())

        act(() => {
            result.current.setTaskTitle('new task')
        })

        await waitFor(() => result.current.taskTitle === 'new task')

        act(() => {
            result.current.addTask()
        })

        await waitFor(() => result.current.tasks.length === 1)

        const [task] = result.current.tasks

        expect(result.current.tasksDone).toBe(0)

        act(() => {
            result.current.toogleTaskDone(task)
        })

        await waitFor(() => result.current.tasksDone === 1)

        expect(result.current.tasksDone).toBe(1)    
    })

    it('should be able add five tasks', async () => {
        const {result} = renderHook(() => useHomeViewModel())

        const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']

        for await (const [index, task] of tasks.entries()) {
            act(() => {
                result.current.setTaskTitle(task)
            })

            await waitFor(() => result.current.taskTitle === task)

            act(() => {
                result.current.addTask()
            })

            await waitFor(() => result.current.tasks.length === index + 1)
        }

        const tasksExpected = tasks.map((task, index) => ({
            id: index + 1,
            title: task,
            done: false
        }))

        expect(result.current.tasks.length).toBe(5)
        expect(result.current.tasks).toEqual(expect.arrayContaining(tasksExpected))
    })

    it('should be able to add five tasks and remove the first one', async () => {
        const {result} = renderHook(() => useHomeViewModel())

        const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']

        for await (const [index, task] of tasks.entries()) {
            act(() => {
                result.current.setTaskTitle(task)
            })

            await waitFor(() => result.current.taskTitle === task)

            act(() => {
                result.current.addTask()
            })

            await waitFor(() => result.current.tasks.length === index + 1)
        }

        const [task] = result.current.tasks

        act(() => {
            result.current.removeTask(task)
        })

        await waitFor(() => result.current.tasks.length === 4)

        const tasksExpected = tasks.slice(1).map((task, index) => ({
            id: index + 2,
            title: task,
            done: false
        }))

        expect(result.current.tasks.length).toBe(4)
        expect(result.current.tasks).toEqual(expect.arrayContaining(tasksExpected))
    })

    it('should be able to add five tasks and remove the last one', async () => {
        const {result} = renderHook(() => useHomeViewModel())

        const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']

        for await (const [index, task] of tasks.entries()) {
            act(() => {
                result.current.setTaskTitle(task)
            })

            await waitFor(() => result.current.taskTitle === task)

            act(() => {
                result.current.addTask()
            })

            await waitFor(() => result.current.tasks.length === index + 1)
        }

        const task = result.current.tasks[4]

        act(() => {
            result.current.removeTask(task)
        })

        await waitFor(() => result.current.tasks.length === 4)

        const tasksExpected = tasks.slice(0, 4).map((task, index) => ({
            id: index + 1,
            title: task,
            done: false
        }))

        expect(result.current.tasks.length).toBe(4)
        expect(result.current.tasks).toEqual(expect.arrayContaining(tasksExpected))
    })

    it('should be able to add five tasks and mark the first one as done', async () => {
        const {result} = renderHook(() => useHomeViewModel())

        const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']

        for await (const [index, task] of tasks.entries()) {
            act(() => {
                result.current.setTaskTitle(task)
            })

            await waitFor(() => result.current.taskTitle === task)

            act(() => {
                result.current.addTask()
            })

            await waitFor(() => result.current.tasks.length === index + 1)
        }

        const task = result.current.tasks[0]

        act(() => {
            result.current.toogleTaskDone(task)
        })

        await waitFor(() => result.current.tasks[0].done === true)

        const tasksExpected = tasks.map((task, index) => ({
            id: index + 1,
            title: task,
            done: index === 0
        }))

        expect(result.current.tasks.length).toBe(5)
        expect(result.current.tasks).toEqual(expect.arrayContaining(tasksExpected))
    })
});