import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks, onTaskClicked, onRemoveClicked }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onTaskClicked={onTaskClicked}
          onRemoveClicked={onRemoveClicked}
        />
      );
    });
  };

  // optionally handle the case where there are no tasks
  if (! tasks.length) {
    return <div>All done!</div>;
  }

  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTaskClicked: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired,
};

export default TaskList;
