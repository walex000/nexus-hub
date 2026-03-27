import React, { useState, useEffect } from 'react';
import { CheckCircle, Trash, Edit } from 'lucide-react';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [priority, setPriority] = useState('medium');
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim() === '') return;
        const newTask = {
            id: Date.now(),
            text: taskInput,
            completed: false,
            priority,
            dueDate: new Date().toISOString().split('T')[0],
        };
        setTasks([...tasks, newTask]);
        setTaskInput('');
        setPriority('medium');
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = (statusFilter === 'all') || (statusFilter === 'completed' && task.completed) || (statusFilter === 'incomplete' && !task.completed);
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h1 className="text-xl font-bold mb-4">To-Do List</h1>
                <input 
                    type="text" 
                    value={taskInput} 
                    onChange={(e) => setTaskInput(e.target.value)} 
                    placeholder="Add a new task..." 
                    className="border rounded p-2 w-full mb-4"
                />
                <select 
                    value={priority} 
                    onChange={(e) => setPriority(e.target.value)} 
                    className="border rounded p-2 mb-4 w-full"
                >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>
                <button onClick={addTask} className="bg-blue-500 text-white rounded p-2 w-full">Add Task</button>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Search tasks..." 
                    className="border rounded p-2 w-full mt-4"
                />
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)} 
                    className="border rounded p-2 mb-4 w-full"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
                <ul className="space-y-2">
                    {filteredTasks.map(task => (
                        <li key={task.id} className="p-2 border-b flex justify-between items-center">
                            <span className={task.completed ? 'line-through' : ''}>{task.text} - {task.priority}</span>
                            <div>
                                <CheckCircle className="cursor-pointer text-green-500" onClick={() => toggleTaskCompletion(task.id)} />
                                <Trash className="cursor-pointer text-red-500 ml-2" onClick={() => deleteTask(task.id)} />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <p>Total Tasks: {tasks.length}</p>
                    <p>Completed Tasks: {tasks.filter(item => item.completed).length}</p>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;