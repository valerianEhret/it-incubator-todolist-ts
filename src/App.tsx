import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';
import {AddItemForm} from "./AddItemForm";




export type FilterValuesType = "all" | "active" | "completed";


type TodolistType = {
    id: string
    title: string
    filter:FilterValuesType
}


 type TaskStateType = {
    [key:string]: Array<TaskType>
 }
function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodolist] = useState<Array<TodolistType>>([
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
            [todoListID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
            ],
            [todoListID2]: [
                {id: v1(), title: "Rest API", isDone: true},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    )

    function removeTask(id: string, todoListID:string) {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID:string) {
        let newTask = { id: v1(), title: title, isDone: false };
        let todoListTasks = tasks[todoListID]

        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }


    function changeStatus(id:string, isDone:boolean, todoListID:string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }


    function changeTaskTitle(id:string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = title
            setTasks({...tasks})
        }

    }

    function changeFilter(id:string, value: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === id)
        if(todoList) {
            todoList.filter = value
            setTodolist([...todoLists])
        }
    }

    function removeTodoList(id:string) {
      setTodolist(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodoList(title:string) {
        let newTodoListID = v1();
          let newTodoList:TodolistType = {
              id:newTodoListID,
              title: title,
              filter: "all"
          }
          setTodolist([newTodoList, ...todoLists]);
          setTasks({
              ...tasks,
              [newTodoListID] : []
          })
    }


    return (

        <div className="App">
            <AddItemForm addItem = {addTodoList} />
            {todoLists.map(tl => {
                let allTasks = tasks[tl.id]
                let tasksForTodolist = allTasks;

                if (tl.filter === "active") {
                    tasksForTodolist = allTasks.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTasks.filter(t => t.isDone === true);
                }


                return (
                    <Todolist title={tl.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeStatus = {changeStatus}
                              filter={tl.filter}
                              id={tl.id}
                              key={tl.id}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                    />
                )

            })}
        </div>
        )
}

export default App;
