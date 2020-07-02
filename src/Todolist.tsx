import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

import EditableSpan from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID:string) => void
    changeFilter: (id:string, value: FilterValuesType) => void
    addTask: (title: string, todoListID:string) => void
    changeStatus: (id:string, isDone:boolean, todoListID:string) => void
    filter:FilterValuesType
    removeTodoList: (id:string) => void
    changeTaskTitle: (id:string, title: string, todoListID: string) => void

}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.id,"all");
    const onActiveClickHandler = () => props.changeFilter(props.id,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed");
    const deleteTodoList = () => {props.removeTodoList(props.id)}
    const createTaskTitle = (title:string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h3>{props.title}<button onClick={ deleteTodoList}>x</button></h3>
        <AddItemForm   addItem={createTaskTitle}/>

        <ul>
            {
               props.tasks.map(t => {
                    const onStatusChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked;
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                   const onTitleChangeCallback = (newTitle:string)=> {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                   }

                    return <li key={t.id} className={props.filter === "all" && t.isDone ? "is-done" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}/>
                        <EditableSpan title={t.title} saveTitle={ onTitleChangeCallback}/>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === "all"?  "active-filter" : ""}
                onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === "active"?  "active-filter" : ""}
                    onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === "completed"?  "active-filter" : ""}
                    onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
