import React, { useEffect, useState } from 'react'
import useTasks from '../hooks/useTasks'
import toast from 'react-hot-toast';
import { useDrag, useDrop } from 'react-dnd';

const TaskList = ({ tasks, setTasks }) => {

    const statusList = ["Pending", "Active", "Completed"]
    return (
        <div className='flex gap-16'>
            {statusList.map((status, id) => <Section key={id} title={status} status={status} tasks={tasks} id={id} setTasks={setTasks} />)}
        </div>
    )
};

export default TaskList;

const Section = ({ title, tasks, setTasks }) => {
    let statusTasks = [];
    if (tasks?.length > 0) {
        statusTasks = tasks.filter((task) => task.status === title);
    }
    const bg = {
        Pending: 'bg-slate-500',
        Active: 'bg-purple-500',
        Completed: 'bg-green-500',
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addItemToSection = (id) => {
        // Capture the 'title' within the function's scope
        const updatedTitle = title;
        console.log("tasks to map", tasks)
        setTasks((prev) => {
            const mTasks = prev.map((t) => {
                console.log("comparing", t.id, "=", id)
                if (t.id === id) {
                    console.log("New Status:", updatedTitle);
                    return { ...t, status: updatedTitle };
                }
                return t;
            });
            return mTasks;
        })
    };

    return (
        <div ref={drop} className={`w-64 rounded-md ${isOver ? "bg-slate-200" : ""}`}>
            <Header text={title} bg={bg[title]} count={statusTasks.length} />
            {statusTasks.map((task) => (
                <Task key={task.id} setTasks={setTasks} tasks={tasks} task={task} />
            ))}
        </div>
    );
};

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text} {"    "}
            <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
                {count}
            </div>
        </div>
    )
}

const Task = ({ task, tasks, setTasks }) => {
    const handleDelete = (id) => {
        const list = tasks.filter(task => task.id !== id);
        setTasks(list);
        toast.success("Deleted task! ");
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: task,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div ref={drag} id={task.id} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}>
            <p>{task.title}</p>
            <button className='absolute bottom-1 right-1 text-slate-400' onClick={() => handleDelete(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
    )
}

