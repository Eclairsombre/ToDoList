
import React, { useEffect, useState } from 'react'
import './ToDoList.css'
import Task from './Task'
import TaskForm from './TaskForm'

function ToDoList() {
  const [tasks, setTasks] = useState([])

  function addTask(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }]
    });
  }
  function removeTask(taskIndex) {
    setTasks(prev => {
      const newTasks = prev.filter((task, index) => index !== taskIndex);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }


  useEffect(() => {
    if (tasks.length === 0) return ;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks]);

  useEffect(() => {
   const tasks =JSON.parse(localStorage.getItem('tasks') );
   setTasks(tasks);
  },[]);

  function updateTaskDone(taskIndex,done){
    setTasks(prev => {
      return prev.map((task,index) => {
        if (index === taskIndex){
          return {...task,done}
        }
        return task;
      })
    })
  }

  const numberOfTasks = tasks.length;
  const numberOfTasksDone = tasks.filter(task => task.done).length;
  const message = numberOfTasksDone === numberOfTasks ? "All tasks done !" : "Keep going !";


  
  
  return (


    <div>

      <h1>ToDoList</h1>
      <h2>{numberOfTasksDone}/{numberOfTasks} Complete</h2>
      <h3>{message}</h3>

      <TaskForm onAdd={addTask} />
      {tasks.map((task ,index) => (
        <Task {...task}
        onTrash={() => {
          if (index != null) {
            removeTask(index);
          }
        }}
        onToggle={done => {
          if (done != null && index != null) {
            updateTaskDone(index, done);
          }
        }}/>
      ))
      }


    </div>
  )
}

export default ToDoList
