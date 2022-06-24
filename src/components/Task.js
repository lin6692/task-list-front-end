import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, updateTask, removeTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const toggleTask = () => {
    const updatedTask = {
      id: id,
      title: title,
      isComplete: !isComplete,
    };
    updateTask(updatedTask);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => toggleTask()}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => removeTask(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default Task;
