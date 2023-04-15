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
});