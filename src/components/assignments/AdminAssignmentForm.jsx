import React, { useState } from 'react';

export default function AdminAssignmentForm({
  onSubmit,
  onCancel,
  initialData = null,
  submitLabel = 'Save Assignment',
}) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [courseType, setCourseType] = useState(initialData?.courseType || 'html');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      courseType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="assignment-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="assignment-title">Assignment Title</label>
          <input
            id="assignment-title"
            type="text"
            placeholder="Enter assignment title..."
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignment-courseType">Course Type</label>
          <select
            id="assignment-courseType"
            className="form-select"
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            <option value="react">React</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignment-dueDate">Due Date</label>
          <input
            id="assignment-dueDate"
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '1rem' }}>
        <label htmlFor="assignment-description">Description</label>
        <textarea
          id="assignment-description"
          rows={3}
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Assignment instructions..."
        />
      </div>

      <div className="assignment-actions" style={{ marginTop: '1rem' }}>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="add-assignment-btn">
          <span aria-hidden="true">+</span>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
