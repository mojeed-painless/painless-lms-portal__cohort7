import UnderDevelopment from "../components/common/UnderDevelopment";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAssignments } from '../hooks/useAssignments';
import {
  History,
  NotepadText,
  Award,
  Send,
  BadgeCheck,
  Edit,
  Save,
  Trash2,
  Plus,
} from 'lucide-react';
import '../assets/styles/assignment.css';

const AssignmentScreen = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const token = user?.token;

  // Use the custom hook
  const {
    pending,
    submitted,
    graded,
    allAssignments,
    loading,
    error,
    fetchPendingAssignments,
    fetchSubmittedAssignments,
    fetchGradedAssignments,
    submitAssignment,
    fetchSubmittedAssignmentsAdmin,
    fetchGradedAssignmentsAdmin,
    gradeAssignment,
    updateGrade,
    fetchAllAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  } = useAssignments(token);

  // Local state for form inputs
  const [assignmentLinks, setAssignmentLinks] = useState({});
  const [scores, setScores] = useState({});
  const [editingGradedId, setEditingGradedId] = useState(null);
  
  // Admin form state
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    courseType: 'html',
    dueDate: '',
  });
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState({
    title: '',
    courseType: 'html',
    dueDate: '',
  });

  // Fetch data on component mount and when role changes
  useEffect(() => {
    if (!token) return;

    if (!isAdmin) {
      fetchPendingAssignments();
      fetchSubmittedAssignments();
      fetchGradedAssignments();
    } else {
      fetchAllAssignments();
      fetchSubmittedAssignmentsAdmin();
      fetchGradedAssignmentsAdmin();
    }
  }, [isAdmin, token]);

  // Helper function to convert courseId to courseType for display
  const getCourseTypeFromId = (courseId) => {
    if (!courseId) return 'Unknown';
    const courseMap = {
      'html': 'html',
      'css': 'css',
      'javascript': 'js',
      'react': 'react',
    };
    return courseMap[courseId] || courseId;
  };

  // Handle student assignment submission
  const handleSubmitAssignment = async (assignmentId, link) => {
    if (!link.trim()) {
      alert('Please paste a valid assignment link');
      return;
    }

    const success = await submitAssignment(assignmentId, link);
    if (success) {
      setAssignmentLinks((prev) => ({ ...prev, [assignmentId]: '' }));
      alert('Assignment submitted successfully!');
    } else {
      alert(error || 'Failed to submit assignment');
    }
  };

  // Handle admin grading
  const handleSaveScore = async (assignmentId) => {
    const score = scores[assignmentId];

    const success = await gradeAssignment(assignmentId, score);
    if (success) {
      setScores((prev) => ({ ...prev, [assignmentId]: '' }));
      alert('Assignment graded successfully!');
    } else {
      alert(error || 'Failed to grade assignment');
    }
  };

  // Handle admin editing grade
  const handleEditScore = (assignmentId, currentScore) => {
    const cleanScore = currentScore.replace('%', '');
    setEditingGradedId(assignmentId);
    setScores((prev) => ({ ...prev, [assignmentId]: cleanScore }));
  };

  // Handle saving edited grade
  const handleSaveEditedScore = async (assignmentId) => {
    const score = scores[assignmentId];

    const success = await updateGrade(assignmentId, score);
    if (success) {
      setEditingGradedId(null);
      setScores((prev) => ({ ...prev, [assignmentId]: '' }));
      alert('Grade updated successfully!');
    } else {
      alert(error || 'Failed to update grade');
    }
  };

  // Handle input changes
  const handleLinkChange = (assignmentId, value) => {
    setAssignmentLinks((prev) => ({ ...prev, [assignmentId]: value }));
  };

  const handleScoreChange = (assignmentId, value) => {
    setScores((prev) => ({ ...prev, [assignmentId]: value }));
  };

  // Admin assignment handlers
  const handleAddAssignment = async (e) => {
    e.preventDefault();
    const success = await createAssignment(
      newAssignment.title,
      '',
      newAssignment.dueDate,
      newAssignment.courseType
    );
    if (success) {
      setNewAssignment({ title: '', courseType: 'html', dueDate: '' });
      alert('Assignment created successfully!');
    } else {
      alert(error || 'Failed to create assignment');
    }
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignmentId(assignment.id);
    setEditingAssignment({
      title: assignment.title,
      courseType: getCourseTypeFromId(assignment.courseId),
      dueDate: assignment.dueDate,
    });
  };

  const handleSaveEditAssignment = async () => {
    const success = await updateAssignment(
      editingAssignmentId,
      editingAssignment.title,
      '',
      editingAssignment.dueDate,
      editingAssignment.courseType
    );
    if (success) {
      setEditingAssignmentId(null);
      alert('Assignment updated successfully!');
    } else {
      alert(error || 'Failed to update assignment');
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment? This will not affect already submitted or graded assignments.')) {
      const success = await deleteAssignment(assignmentId);
      if (success) {
        alert('Assignment deleted successfully!');
      } else {
        alert(error || 'Failed to delete assignment');
      }
    }
  };

  // Show error if any
  if (error && !loading) {
    return (
      <div className="assignments-container">
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    // <UnderDevelopment section="Assignment" />
    <div className="assignments-container">
      {loading && <p className="loading-message">Loading assignments...</p>}

      {!isAdmin && (
        <>
          {/* 1. STUDENT - Pending Assignments */}
          <section className="assignment-card pending-section">
            <div className="card-header">
              <h3>
                <span className="orange">
                  <History size={19} />
                </span>
                Pending Assignments
              </h3>
              <span className="count-badge orange">{pending.length} {`assignment${pending.length <= 1 ? '' : 's'}`}</span>
            </div>
            <div className="table-responsive">
              <table className="assignment__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Assignment Link</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {pending.length > 0 && (
                  <tbody>
                    {pending.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="bold">{item.title}</td>
                        <td className="assignment__date">
                          {new Date(item.dueDate).toLocaleDateString()}
                        </td>
                        <td className="first-inputs">
                          <input
                            type="text"
                            placeholder="Paste your assignment link here..."
                            className="link-input first-input"
                            value={assignmentLinks[item.id] || ''}
                            onChange={(e) =>
                              handleLinkChange(item.id, e.target.value)
                            }
                          />
                        </td>
                        <td className="assignment__action">
                          <button
                            className="submit-btn"
                            onClick={() =>
                              handleSubmitAssignment(
                                item.id,
                                assignmentLinks[item.id]
                              )
                            }
                            disabled={loading}
                          >
                            <span>
                              <Send size={18} />
                            </span>
                            {loading ? 'Submitting...' : 'Submit'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {pending.length === 0 && (
                <p className="empty__assignment">No Pending Assignment</p>
              )}
            </div>
          </section>

          {/* 2. STUDENT - Submitted Assignments */}
          <section className="assignment-card submitted-section">
            <div className="card-header">
              <h3>
                <span className="blue">
                  <NotepadText size={19} />
                </span>
                Submitted Assignments
              </h3>
              <span className="count-badge blue">{submitted.length} {`assignment${submitted.length <= 1 ? '' : 's'}`}</span>
            </div>
            <div className="table-responsive">
              <table className="assignment__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Submitted Date</th>
                    <th>Assignment Link</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {submitted.length > 0 && (
                  <tbody>
                    {submitted.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="bold">{item.title}</td>
                        <td>
                          {new Date(item.dueDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(item.submittedDate).toLocaleDateString()}
                        </td>
                        <td>
                          <input
                            type="text"
                            readOnly
                            value={item.submissionLink}
                            className="link-input gray"
                          />
                        </td>
                        <td className="assignment__action">
                          <span className="status-badge pending">
                            <span>
                              <History size={18} />
                            </span>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {submitted.length === 0 && (
                <p className="empty__assignment">No Assignment Submitted</p>
              )}
            </div>
          </section>

          {/* 3. STUDENT - Graded Assignments */}
          <section className="assignment-card graded-section">
            <div className="card-header">
              <h3>
                <span className="green">
                  <Award size={19} />
                </span>
                Graded Assignments
              </h3>
              <span className="count-badge green">{graded.length} {`assignment${graded.length <= 1 ? '' : 's'}`}</span>
            </div>
            <div className="table-responsive">
              <table className="assignment__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Submitted Date</th>
                    <th>Assignment Link</th>
                    <th>Score</th>
                  </tr>
                </thead>
                {graded.length > 0 && (
                  <tbody>
                    {graded.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="bold">{item.title}</td>
                        <td>
                          {new Date(item.dueDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(item.submittedDate).toLocaleDateString()}
                        </td>
                        <td>
                          <input
                            type="text"
                            readOnly
                            value={item.submissionLink}
                            className="link-input gray"
                          />
                        </td>
                        <td className="assignment__action">
                          <span className="score-badge">
                            <span>
                              <BadgeCheck size={18} />
                            </span>
                            {item.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {graded.length === 0 && (
                <p className="empty__assignment">No Assignment Graded</p>
              )}
            </div>
          </section>
        </>
      )}

      {/* ADMIN VIEW */}
      {isAdmin && (
        <>
          {/* 0. ADMIN - Add Assignment Section */}
          <section className="assignment-card add-assignment-section">
            <div className="card-header">
              <h3>
                <span className="purple">
                  <Plus size={19} />
                </span>
                Create Assignment
              </h3>
            </div>
            <div className="add-assignment-form">
              <form onSubmit={handleAddAssignment} className="assignment-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Assignment Title</label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Enter assignment title..."
                      className="form-input"
                      value={newAssignment.title}
                      onChange={(e) =>
                        setNewAssignment({ ...newAssignment, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="courseType">Course Type</label>
                    <select
                      id="courseType"
                      className="form-select"
                      value={newAssignment.courseType}
                      onChange={(e) =>
                        setNewAssignment({ ...newAssignment, courseType: e.target.value })
                      }
                    >
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="js">JavaScript</option>
                      <option value="react">React</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                      id="dueDate"
                      type="date"
                      className="form-input"
                      value={newAssignment.dueDate}
                      onChange={(e) =>
                        setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button type="submit" className="add-assignment-btn" disabled={loading}>
                    <span><Plus size={18} /></span>
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>

              {/* Uploaded Assignments List */}
              {allAssignments.length > 0 && (
                <div className="uploaded-assignments">
                  <h4>Uploaded Assignments</h4>
                  <div className="assignments-list">
                    {allAssignments.map((assignment) => (
                      <div key={assignment.id} className="assignment-item">
                        {editingAssignmentId === assignment.id ? (
                          <div className="assignment-edit-form">
                            <input
                              type="text"
                              className="form-input"
                              value={editingAssignment.title}
                              onChange={(e) =>
                                setEditingAssignment({
                                  ...editingAssignment,
                                  title: e.target.value,
                                })
                              }
                            />
                            <select
                              className="form-select"
                              value={editingAssignment.courseType}
                              onChange={(e) =>
                                setEditingAssignment({
                                  ...editingAssignment,
                                  courseType: e.target.value,
                                })
                              }
                            >
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                              <option value="js">JavaScript</option>
                              <option value="react">React</option>
                            </select>
                            <input
                              type="date"
                              className="form-input"
                              value={editingAssignment.dueDate}
                              onChange={(e) =>
                                setEditingAssignment({
                                  ...editingAssignment,
                                  dueDate: e.target.value,
                                })
                              }
                            />
                            <button
                              className="save-score-btn"
                              onClick={handleSaveEditAssignment}
                              disabled={loading}
                            >
                              <span><Save size={16} /></span>
                              Save
                            </button>
                            <button
                              className="cancel-btn"
                              onClick={() => setEditingAssignmentId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="assignment-info">
                            <div className="assignment-details">
                              <h5>{assignment.title}</h5>
                              <span className="course-badge">{getCourseTypeFromId(assignment.courseId).toUpperCase()}</span>
                              <p className="due-date">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="assignment-actions">
                              <button
                                className="edit-btn"
                                onClick={() => handleEditAssignment(assignment)}
                              >
                                <span><Edit size={16} /></span>
                              </button>
                              <button
                                className="delete-btn"
                                onClick={() => handleDeleteAssignment(assignment.id)}
                              >
                                <span><Trash2 size={16} /></span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 1. ADMIN - Submitted Assignments */}
          <section className="assignment-card submitted-section">
            <div className="card-header">
              <h3>
                <span className="blue">
                  <NotepadText size={19} />
                </span>
                Submitted Assignments
              </h3>
              <span className="count-badge blue">{submitted.length} assignments</span>
            </div>
            <div className="table-responsive">
              <table className="assignment__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Student Name</th>
                    <th>Due Date</th>
                    <th>Submitted Date</th>
                    <th>Assignment Link</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {submitted.length > 0 && (
                  <tbody>
                    {submitted.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="bold">{item.title}</td>
                        <td className="bold">{item.studentName}</td>
                        <td>
                          {new Date(item.dueDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(item.submittedDate).toLocaleDateString()}
                        </td>
                        <td>
                          <input
                            type="text"
                            readOnly
                            value={item.submissionLink}
                            className="link-input gray"
                          />
                        </td>
                        <td className="score-input-cell">
                          <input
                            type="number"
                            placeholder="Enter score..."
                            className="score-input"
                            value={scores[item.id] || ''}
                            onChange={(e) =>
                              handleScoreChange(item.id, e.target.value)
                            }
                            min="0"
                            max="100"
                          />
                        </td>
                        <td className="assignment__action">
                          <button
                            className="save-score-btn"
                            onClick={() => handleSaveScore(item.id)}
                            disabled={loading}
                          >
                            <span>
                              <Save size={18} />
                            </span>
                            {loading ? 'Saving...' : 'Save'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {submitted.length === 0 && (
                <p className="empty__assignment">No Assignment Submitted</p>
              )}
            </div>
          </section>

          {/* 2. ADMIN - Graded Assignments */}
          <section className="assignment-card graded-section">
            <div className="card-header">
              <h3>
                <span className="green">
                  <Award size={19} />
                </span>
                Graded Assignments
              </h3>
              <span className="count-badge green">{graded.length} assignments</span>
            </div>
            <div className="table-responsive">
              <table className="assignment__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Student Name</th>
                    <th>Due Date</th>
                    <th>Submitted Date</th>
                    <th>Assignment Link</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {graded.length > 0 && (
                  <tbody>
                    {graded.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="bold">{item.title}</td>
                        <td className="bold">{item.studentName}</td>
                        <td>
                          {new Date(item.dueDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(item.submittedDate).toLocaleDateString()}
                        </td>
                        <td>
                          <input
                            type="text"
                            readOnly
                            value={item.submissionLink}
                            className="link-input gray"
                          />
                        </td>
                        <td>
                          {editingGradedId === item.id ? (
                            <input
                              type="number"
                              className="score-input"
                              value={scores[item.id] || ''}
                              onChange={(e) =>
                                handleScoreChange(item.id, e.target.value)
                              }
                              min="0"
                              max="100"
                            />
                          ) : (
                            <span className="score-badge">
                              <span>
                                <BadgeCheck size={18} />
                              </span>
                              {item.score}
                            </span>
                          )}
                        </td>
                        <td className="assignment__action">
                          {editingGradedId === item.id ? (
                            <button
                              className="save-score-btn"
                              onClick={() => handleSaveEditedScore(item.id)}
                              disabled={loading}
                            >
                              <span>
                                <Save size={18} />
                              </span>
                              {loading ? 'Saving...' : 'Save'}
                            </button>
                          ) : (
                            <button
                              className="edit-btn"
                              onClick={() =>
                                handleEditScore(item.id, item.score)
                              }
                            >
                              <span>
                                <Edit size={18} />
                              </span>
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {graded.length === 0 && (
                <p className="empty__assignment">No Assignment Graded</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AssignmentScreen;