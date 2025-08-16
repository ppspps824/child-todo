import React from 'react';
import { Task } from '../types';

interface TodoItemProps {
  task: Task;
  index: number;
  onToggle: (id: string, person: 1 | 2) => void;
  onDelete: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
}

const CustomCheckbox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => {
    return (
        <div 
            onClick={onChange}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                checked ? 'bg-green-400 shadow-lg' : 'bg-gray-200'
            }`}
        >
            {checked && <span className="text-white text-2xl">✔</span>}
        </div>
    );
};

const TodoItem: React.FC<TodoItemProps> = ({ task, index, onToggle, onDelete, onDragStart, onDragEnter }) => {
  const isCompleted = task.completed1 && task.completed2;

  return (
    <li
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragOver={(e) => e.preventDefault()}
      className={`grid grid-cols-[auto_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 p-4 items-center border-b-2 border-amber-100 transition-colors duration-300 ${isCompleted ? 'bg-green-100/70 text-gray-400' : 'bg-white hover:bg-amber-50'}`}
    >
      <div className="cursor-grab text-gray-400 hover:text-gray-600 px-2 no-print" title="ならびかえ">
        ☰
      </div>
      <span className={`text-lg transition-all ${isCompleted ? 'line-through' : ''}`}>
        {task.text}
      </span>
      <div className="flex justify-center">
        <CustomCheckbox checked={task.completed1} onChange={() => onToggle(task.id, 1)} />
      </div>
      <div className="flex justify-center">
        <CustomCheckbox checked={task.completed2} onChange={() => onToggle(task.id, 2)} />
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-400 hover:text-red-600 font-bold text-2xl transition-transform transform hover:scale-125 px-2 no-print"
        aria-label="さくじょ"
      >
        🗑️
      </button>
    </li>
  );
};

export default TodoItem;