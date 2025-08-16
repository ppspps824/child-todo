
import React from 'react';
import { Task } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  name1: string;
  name2: string;
  setName1: (name: string) => void;
  setName2: (name: string) => void;
  onToggle: (id: string, person: 1 | 2) => void;
  onDelete: (id: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, name1, name2, setName1, setName2, onToggle, onDelete, onMove }) => {
  const dragItem = React.useRef<number | null>(null);
  const dragOverItem = React.useRef<number | null>(null);

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      onMove(dragItem.current, dragOverItem.current);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center p-10 bg-white/70 rounded-2xl shadow-lg">
        <p className="text-2xl text-gray-500">🎉 ぜんぶ おわったね！ 🎉</p>
        <p className="text-gray-400 mt-2">あたらしい やることを つくろう！</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-4 p-4 bg-blue-500 text-white font-bold text-center items-center">
        <div className="text-left pl-10">やること</div>
        <input type="text" value={name1} onChange={e => setName1(e.target.value)} className="w-full bg-transparent text-center text-white placeholder-white/70 outline-none p-1 rounded hover:bg-blue-600 focus:bg-blue-600"/>
        <input type="text" value={name2} onChange={e => setName2(e.target.value)} className="w-full bg-transparent text-center text-white placeholder-white/70 outline-none p-1 rounded hover:bg-blue-600 focus:bg-blue-600"/>
        <div></div>
      </div>
      <ul onDragEnd={handleDragEnd}>
        {tasks.map((task, index) => (
          <TodoItem
            key={task.id}
            task={task}
            index={index}
            onToggle={onToggle}
            onDelete={onDelete}
            onDragStart={(i) => dragItem.current = i}
            onDragEnter={(i) => dragOverItem.current = i}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
