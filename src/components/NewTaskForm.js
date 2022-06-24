import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addNewTask }) => {
  const [formField, setFormField] = useState({ title: '', description: '' });

  const handleFormChange = (event) => {
    const eventData = event.target;
    const name = eventData.name;
    const value = eventData.value;

    const updatedFormField = { ...formField };
    updatedFormField[name] = value;
    setFormField(updatedFormField);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        addNewTask(formField);
        setFormField({ title: '', description: '' });
      }}
    >
      <div>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          value={formField.title}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          type="text"
          value={formField.description}
          onChange={handleFormChange}
        />
      </div>
      <input type="submit" value="Add Task" />
    </form>
  );
};

NewTaskForm.propTypes = {
  addNewTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
