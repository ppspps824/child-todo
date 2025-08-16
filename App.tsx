import React, { useState, useCallback, useEffect } from 'react';
import { Task } from './types';
import { PRESET_TASKS } from './constants';
import Header from './components/Header';
import TodoList from './components/TodoList';
import PresetTasks from './components/PresetTasks';

const SAVED_STATE_KEY = 'kidsTodoListData';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [name1, setName1] = useState('おにいちゃん');
  const [name2, setName2] = useState('いもうと');

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedStateJSON = localStorage.getItem(SAVED_STATE_KEY);
      if (savedStateJSON) {
        const savedState = JSON.parse(savedStateJSON);
        if (savedState) {
          setTasks(savedState.tasks || []);
          setName1(savedState.name1 || 'おにいちゃん');
          setName2(savedState.name2 || 'いもうと');
        }
      }
    } catch (e) {
      console.error("Could not load state from local storage", e);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = JSON.stringify({ tasks, name1, name2 });
      localStorage.setItem(SAVED_STATE_KEY, stateToSave);
    } catch (e) {
      console.error("Could not save state to local storage", e);
    }
  }, [tasks, name1, name2]);


  const addTask = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed1: false,
      completed2: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  const toggleTask = useCallback((id: string, person: 1 | 2) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          if (person === 1) return { ...task, completed1: !task.completed1 };
          if (person === 2) return { ...task, completed2: !task.completed2 };
        }
        return task;
      })
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      const [draggedItem] = newTasks.splice(dragIndex, 1);
      newTasks.splice(hoverIndex, 0, draggedItem);
      return newTasks;
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm("ほんとうに ぜんぶ けして しんしく はじめる？")) {
      setTasks([]);
      setName1('おにいちゃん');
      setName2('いもうと');
    }
  };

  return (
    <div className="min-h-screen bg-amber-100/50 text-gray-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="no-print">
          <Header />
        </div>
        <main>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 no-print">
            <h2 className="text-xl font-bold text-amber-600 mb-4">あたらしい やることを つくろう！</h2>
            <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newTaskText}
                onChange={e => setNewTaskText(e.target.value)}
                placeholder="なにを する？ (れい：えほんを よむ)"
                className="flex-grow p-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                <span className="text-2xl">✏️</span>
                <span>ついか</span>
              </button>
            </form>
          </div>
          
          <div className="no-print">
            <PresetTasks onAddTask={addTask} />
          </div>

          <div className="flex justify-end mb-4 no-print gap-4">
            <button
              onClick={handleReset}
              className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              aria-label="はじめから"
            >
              <span className="text-2xl">🔄</span>
              <span>はじめから</span>
            </button>
            <button
              onClick={handlePrint}
              className="bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition-transform transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              aria-label="いんさつする"
            >
              <span className="text-2xl">🖨️</span>
              <span>いんさつする</span>
            </button>
          </div>
          
          <div className="printable-area">
            <TodoList
              tasks={tasks}
              name1={name1}
              name2={name2}
              setName1={setName1}
              setName2={setName2}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onMove={moveTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;