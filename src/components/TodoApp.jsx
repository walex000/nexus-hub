import React, { useState, useEffect } from 'react';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t));
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    return (
        <div>
            <h1>Todo List</h1>
            <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a task" />
            <button onClick={addTask}>Add</button>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>
            <ul>
                {filteredTasks.map((t, index) => (
                    <li key={index} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
                        {t.text}
                        <button onClick={() => toggleTask(index)}>Toggle</button>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;