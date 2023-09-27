import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuid4 } from 'uuid';
const CreateTask = ({tasks,setTasks}) => {
    const [task, setTask] = useState("");
    const handleSubmit = () => {
        if (task.length < 4) {
            toast.error("Title Must be more than 3 characters")
            return;
        }
        if (task.length > 100) {
            toast.error("Title Must be less than 100 characters")
            return;
        }
        const tempTask = {
            id: uuid4(),
            title: task,
            status: "Pending"
        }
        
        setTasks((prev)=>{
            console.log("Prev before add",prev)
            const list = [...prev,tempTask]
            return list;
        });
        setTask("")
        toast.success("Task Added.")
    }
    return (
        <div className='flex flex-row items-start'>
            <input
                type='text'
                placeholder='Enter Task title....'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1'
            />
            <button
                className='bg-cyan-500 rounded-md px-4 h-12 text-white'
                onClick={handleSubmit}>
                Create Task
            </button>
        </div>
    )
}

export default CreateTask;