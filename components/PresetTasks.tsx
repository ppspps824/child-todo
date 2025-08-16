
import React from 'react';
import { PRESET_TASKS } from '../constants';

interface PresetTasksProps {
  onAddTask: (text: string) => void;
}

const PresetTasks: React.FC<PresetTasksProps> = ({ onAddTask }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-teal-600 mb-4">かんたん ついか</h2>
      <div className="flex flex-wrap gap-3">
        {PRESET_TASKS.map(taskText => (
          <button
            key={taskText}
            onClick={() => onAddTask(taskText)}
            className="bg-teal-400 text-white font-bold py-2 px-4 rounded-full hover:bg-teal-500 transition-transform transform hover:scale-105 shadow"
          >
            {taskText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetTasks;
