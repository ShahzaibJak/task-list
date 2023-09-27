import React, { useEffect, useState } from 'react'
import CreateTask from './components/create-task'
import TaskList from './components/task-list'
import { Toaster } from 'react-hot-toast'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <Toaster />
      <DndProvider backend={HTML5Backend}>
        <div className='bg-slate-100 flex flex-col items-center w-screen h-screen pt-20 gap-10'>
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </>

  )
}

export default App