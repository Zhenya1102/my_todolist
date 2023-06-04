import React, {useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {UniversalButton} from './UniversalComponent/UniversalButton';
import {UniversalInput} from './UniversalComponent/UniversalInput';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {UniversalCheckbox} from './UniversalComponent/UniversalCheckbox';

export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (titleInput: string) => void
    changeTaskStatus: (id:string, isDone:boolean)=> void
    filter: string
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter} = props
    const [value, setValue] = useState<string>('') // useSate для input
    const [listRef] = useAutoAnimate<HTMLUListElement>() // это кастомный хук (custom hook) библиотеки framer-motion, который позволяет автоматически добавлять анимацию - плавное добавление таски
    const [error, setError] = useState<string | undefined>('') // state ошибки
    const addTaskHandler = () => { // добавление новой таски и очищение input
        if (value.trim() !== '') { // защита от пустой строки
            addTask(value.trim()) // добавление таски и защита от пробелов
            setValue('') // очищение input
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => {
        changeFilter('all')
    }
    const onActiveClickHandler = () => {
        changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed')
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <UniversalInput
                    value={value}
                    setTitleInput={setValue}
                    callBack={addTaskHandler}
                    error={error}
                    setError = {setError}
                />
                <UniversalButton
                    name={'+'}
                    callBack={addTaskHandler}
                    error={error}
                />
            </div>
            <ul ref={listRef}>
                {tasks.map(task => {
                    const onChangeCheckboxHandler = (value:boolean) => {
                        changeTaskStatus(task.id, value)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <UniversalCheckbox checked={task.isDone} callBack={onChangeCheckboxHandler}/>
                            <span>{task.title}</span>
                            <UniversalButton name={'✖️'} callBack={() => removeTask(task.id)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <UniversalButton name={'ALL'} callBack={onAllClickHandler}/>
                <UniversalButton name={'Active'} callBack={onActiveClickHandler}/>
                <UniversalButton name={'Completed'} callBack={onCompletedClickHandler}/>
            </div>
        </div>
    )
}