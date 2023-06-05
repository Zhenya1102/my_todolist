import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
        {id: v1(), title: 'Angular', isDone: false}
    ])
    // ==================================================== //
    const removeTask = (id: string) => { // Удаление таски
        setTasks(tasks.filter(el => el.id !== id))
    }

    // ==================================================== //
    let tasksForTodolist = tasks // здесь храним отфильтрованные таски
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(tasks => !tasks.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(tasks => tasks.isDone)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    // ==================================================== //
    const addTask = (titleInput:string) => { // добавление новой таски
        const newTask = {id: v1(), title: titleInput, isDone: true}
        setTasks([newTask,...tasks])
    }
    // ==================================================== //
    const changeTaskStatus = (id:string, isDone:boolean) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone}: task))
    }
    return (
        <div className="App">
            <Todolist
                addTask = {addTask}
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus = {changeTaskStatus}
                filter = {filter}
            />
        </div>
    );
}

export default App;
