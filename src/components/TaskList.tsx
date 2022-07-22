import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle.length !== 0){
      let idSeq = 0;
      if(tasks.length === 0){
        idSeq = 1;
      }else{
        idSeq = Math.max(...tasks.map(task => task.id)) + 1;
      }

      const task: Task = {
        id: idSeq,
        title: newTaskTitle,
        isComplete: false
      }

      setTasks([task, ...tasks]);
    }else {
      return;
    }
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(tasks => {
      return tasks.map(task =>{
        if(task.id === id){
          return {...task, isComplete: !task.isComplete};
        }else{
          return task;
        }
      })
    })
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      return tasks.splice(taskIndex, 1)
    });
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}