import React, { useState, useEffect } from 'react';
import { TaskCreator } from './components/TaskCreator';
import { TaskTable } from './components/TaskTable';
import { VisibilityControl } from './components/VisivilityControl';
import { Container } from './components/Container';
import './App.css';

function App() {

  const [tasksItems, setTaskItems] = useState([])
  const [showCompleted, setShowCompleted] = useState(false)

  function crateNewTask(taksname) {
    if (!tasksItems.find(task => task.name === taksname)) {
      setTaskItems([...tasksItems, { name: taksname, done: false }])
    }
  }

  const toggleTask = task => {
    setTaskItems(tasksItems.map(t => (t.name === task.name) ? { ...t, done: !t.done } : t))
  }

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if (data) {
      setTaskItems(JSON.parse(data))
    }
  }, [])

  const cleanTasks = () => {
    setTaskItems(tasksItems.filter(task => !task.done))
    setShowCompleted(false)
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasksItems))
  }, [tasksItems])

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator crateNewTask={crateNewTask} />
        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />

        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />

        {
          showCompleted && (
            <TaskTable tasks={tasksItems} toggleTask={toggleTask} showCompleted={showCompleted} />
          )
        }
      </Container>
    </main>
  );
}

export default App;
