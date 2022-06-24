import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm.js';
import './App.css';
import axios from 'axios';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/tasks')
      .then((response) => {
        const apiTasks = response.data.map((task) => {
          return { ...task, isComplete: task.is_complete };
        });
        // console.log(apiTasks);
        setTasks(apiTasks);
      })
      .catch((error) => {
        console.log("can't get list from api");
        console.log(error);
      });
  }, []);

  const updateTask = (updatedTask) => {
    // task has been updated already
    if (updatedTask.isComplete) {
      axios.patch(
        `http://127.0.0.1:5000/tasks/${updatedTask.id}/mark_complete`
      );
    } else {
      axios.patch(
        `http://127.0.0.1:5000/tasks/${updatedTask.id}/mark_incomplete`
      );
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.log("couldn't remove");
        console.log(error);
      });
  };

  const addNewTask = (newTask) => {
    // const task = {
    //   title: 'react title',
    //   description: 'desc',
    // };
    axios
      .post('http://127.0.0.1:5000/tasks', newTask)
      .then(() => {
        const newId = Math.max(...tasks.map((task) => task.id)) + 1;
        newTask = { ...newTask, id: newId, isComplete: false };
        setTasks([...tasks, newTask]);
      })
      .catch((error) => {
        console.log('Failed to add new task');
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              updateTask={updateTask}
              removeTask={removeTask}
            />
          }
        </div>
        <NewTaskForm addNewTask={addNewTask} />
      </main>
    </div>
  );
};

export default App;
