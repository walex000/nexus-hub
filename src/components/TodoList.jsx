import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './TodoList.css'; // Assuming CSS for Tailwind is in this file

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, { text: task, completed: false, priority: 'normal', dueDate: null, category: '' }]);
    setTask('');
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <div className="flex mb-4">
        <input 
          type="text" 
          placeholder="Add a new task" 
          className="flex-grow p-2 border border-gray-300 rounded"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button 
          onClick={addTask} 
          className="ml-2 p-2 text-white bg-blue-500 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex mb-4">
        <input 
          type="text" 
          placeholder="Search tasks" 
          className="flex-grow p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="ml-2 text-gray-500" />
      </div>
      <div className="mb-4">
        <button onClick={() => setFilter('all')} className="mr-2">All</button>
        <button onClick={() => setFilter('active')} className="mr-2">Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
            <div>
              <button onClick={() => toggleTaskCompletion(index)} className="mr-2">
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;