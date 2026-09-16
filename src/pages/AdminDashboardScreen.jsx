import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/styles/admin.css'; 
import { adminStats } from '../data.js';
import {
    History,
    UserRoundCheck,
    Clock,
} from 'lucide-react';
import {
  fetchPendingUsers,
  fetchAllUsers,
  updateUser,
  deleteUser,
  updateCourseAccess,
} from '../services/adminApi';
import { logError, logInfo } from '../utils/logger';



const AdminDashboardScreen = () => {
    const { user } = useAuth();
    const activeUser = user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userInfo') || 'null') : null);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseAccess, setCourseAccess] = useState({});
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'info') => {
      setToast({ message, type });
    };

  // --- Data Fetching ---
  const fetchUsers = useCallback(async () => {
    if (!activeUser || activeUser.role !== 'admin') return;
    setLoading(true);
    try {
      // 1. Fetch Pending Users
      const pendingData = await fetchPendingUsers(activeUser.token);
      const pendingArray = Array.isArray(pendingData) ? pendingData : pendingData.users || [];
      const normalizedPending = pendingArray.map(u => ({
        _id: u._id || u.id,
        username: u.username || `${u.firstName || ''}`.trim(),
        email: u.email || u.emailAddress || '',
        role: u.role || 'student',
      }));
      setPendingUsers(normalizedPending);

      // 2. Fetch ALL Users
      const allData = await fetchAllUsers(activeUser.token);

      // Normalize response which may be an array or { users: [...] }
      const usersArray = Array.isArray(allData) ? allData : allData.users || [];

      // Normalize individual user fields to the shape expected by this component
      const normalized = usersArray.map(u => ({
        _id: u._id || u.id,
        firstName: u.firstName || u.first_name || u.first || '',
        lastName: u.lastName || u.last_name || u.last || '',
        email: u.email || u.emailAddress || '',
        role: u.role || 'student',
        isApproved: typeof u.isApproved === 'boolean' ? u.isApproved : !!u.approved,
        htmlAccess: typeof u.htmlAccess === 'boolean' ? u.htmlAccess : (Array.isArray(u.courseAccess) ? u.courseAccess.includes('html') : !!u.htmlAccess),
        jsAccess: typeof u.jsAccess === 'boolean' ? u.jsAccess : (Array.isArray(u.courseAccess) ? u.courseAccess.includes('js') : !!u.jsAccess),
        reactAccess: typeof u.reactAccess === 'boolean' ? u.reactAccess : (Array.isArray(u.courseAccess) ? u.courseAccess.includes('react') : !!u.reactAccess),
      }));

      // Filter 'all' data to include only approved users (and exclude the logged-in admin)
      const approvedUsers = normalized.filter(u => u.isApproved && u._id !== activeUser._id);

      setAllUsers(approvedUsers);

      // Load course access state from users data
      const access = {};
      approvedUsers.forEach(u => {
        access[`${u._id}-html`] = !!u.htmlAccess;
        access[`${u._id}-js`] = !!u.jsAccess;
        access[`${u._id}-react`] = !!u.reactAccess;
      });
      setCourseAccess(access);

      setError(null);
    } catch (err) {
      logError('Error fetching users', { error: err.message });
      setError(err.message || 'Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  }, [activeUser]);

  // --- Action Handler: Approve/Reject/Change Role ---
  const handleUpdateUser = async (userId, isApproved, newRole) => {
    setLoading(true);
    try {
      const body = { isApproved };
      if (newRole) {
        body.role = newRole;
      }
      await updateUser(userId, body, activeUser.token);
      if (newRole) {
        showToast(`Role updated to ${newRole}`, 'success');
      }
      
      // Refresh both lists after update (user moves from pending to all)
      fetchUsers();
      
    } catch (err) {
      logError('Error updating user status', { userId, error: err.message });
      setError(err.message || 'Failed to update user status.');
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    if (activeUser && activeUser.role === 'admin') {
      fetchUsers();
    }
  }, [activeUser, fetchUsers]);

  const handleDeleteUser = async (userId) => {
    // IMPORTANT: Replacing window.confirm() with a custom modal is required in production environments.
    if (!window.confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
        return;
    }
    
    setLoading(true);
    try {
      await deleteUser(userId, activeUser.token);
      showToast('User deleted successfully', 'success');
      
      // Refresh the list immediately to remove the deleted user from the UI
      fetchUsers(); 
      
    } catch (err) {
      logError('Error deleting user', { userId, error: err.message });
      setError(err.message || 'Failed to delete user.');
    } finally {
      setLoading(false);
    }
  };
    




  const handleCourseAccessChange = async (userId, courseName, isChecked) => {
    const key = `${userId}-${courseName}`;
    
    // Optimistic update - update UI immediately
    setCourseAccess(prev => ({
      ...prev,
      [key]: isChecked
    }));

    try {
      // Map course names to backend field names
      const fieldMap = {
        'html': 'htmlAccess',
        'js': 'jsAccess',
        'react': 'reactAccess'
      };

      const updateData = {
        [fieldMap[courseName]]: isChecked
      };

      logInfo('Sending course access update', { userId, courseName, updateData });

      // Send to backend
      const response = await updateCourseAccess(userId, updateData, activeUser.token);

      // Verify the update was successful
      if (response) {
        logInfo('Course access updated', { userId, courseName });
        
        // Silently refresh the user data to sync with backend (no loading state)
        try {
          const allData = await fetchAllUsers(activeUser.token);
          const approvedUsers = Array.isArray(allData) 
            ? allData.filter(u => u.isApproved && u._id !== activeUser._id)
            : [];
          
          // Update course access from latest data
          const access = {};
          approvedUsers.forEach(u => {
            access[`${u._id}-html`] = u.htmlAccess;
            access[`${u._id}-js`] = u.jsAccess;
            access[`${u._id}-react`] = u.reactAccess;
          });
          setCourseAccess(access);
        } catch (refreshErr) {
          logError('Error refreshing user data', { userId, error: refreshErr.message });
        }
      }

    } catch (err) {
      logError('Error updating course access', { userId, courseName, error: err.message });
      setError(err.message || `Failed to update ${courseName} access.`);
      // Revert on error
      setCourseAccess(prev => ({
        ...prev,
        [key]: !isChecked
      }));
    }
  };

    if (activeUser?.role !== 'admin') {
        return (
            <div className="error-state">
                ACCESS DENIED: You must be an Administrator to view this page.
            </div>
        );
    }

    const totalUsers = allUsers.length + pendingUsers.length;
    const PendingStudents = pendingUsers.length;
    const ApprovedStudents = allUsers.length;

    return (
      <div className="admin-container">
        <h1 className="page-title">Admin Dashboard</h1>
        
        <div className="stats-grid">
          {adminStats.map(({title, value, Icon, color}) => (
              <div key={title} className="stat-card">
                  <div>
                      <p className="stat-label">{title}</p>
                      <h2 className="stat-value">
                          {title === 'Total Users' && totalUsers}
                          {title === 'Pending Approval' && PendingStudents}
                          {title === 'Approved Users' && ApprovedStudents}
                          {title === 'Course Enrollments' && value}
                      </h2>
                  </div>
                  <div className={`stat-icon ${color}`}><Icon/></div>
              </div>
          ))} 
        </div>

        <section className="section-container">
          <h3 className="section-title">
              <span> <History size={20}/> </span>
              <span> Pending Approvals </span>
              <span className="admin-badge">{PendingStudents}</span>
          </h3>

          {error && <div className="error-message">{error}</div>}

          {loading && <div className="loading-message">Loading pending requests...</div>}
                  
          {!loading && pendingUsers.length === 0 && (
              <div className="empty-message">No accounts currently pending approval.</div>
          )}

          <div className="pending-grid">
            {pendingUsers.map(userItem => (
              <div key={userItem._id} className="pending-card">
                <div className="card-header">
                  <div className="user-info">
                    <h4>{userItem.username}</h4>
                    <p>{userItem.email}</p>
                    <small>Registered: Jan 10, 2024</small>
                  </div>
                  <div className="action-btns">
                    <button aria-label="Delete" className="btn-reject" onClick={() => handleDeleteUser(userItem._id)}>✕</button>
                    <button aria-label="Approve" className="btn-approve" onClick={() => handleUpdateUser(userItem._id, true, userItem.role)}>✓</button>
                  </div>
                </div>
                <div className="card-tags">
                    <span className={`tag html`}>
                      HTML
                    </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-container">
          <h3 className="section-title">
              <span className='green-color'><UserRoundCheck size={20}/></span> 
              <span>Approved Users</span> 
              <span className="admin-badge green-bg">{ApprovedStudents}</span>
          </h3>

          {allUsers.length === 0 && !loading && (
              <p className="empty-message">No approved users found (excluding yourself).</p>
          )}

          <div className="admin__table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Registered</th>
                  <th>HTML</th>
                  <th>Advanced JavaScript</th>
                  <th>React</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(userItem => (
                  <tr key={userItem._id}>
                    <td>
                      <div className="table-user">
                        <div className="user-avatar small">MS</div>
                        <div>
                          <strong>
                            <span>{userItem.firstName}</span>
                            {' '}
                            <span>{userItem.lastName}</span>
                          </strong>
                          <small>{userItem.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select
                        aria-label={`Role for ${userItem.firstName} ${userItem.lastName}`}
                        data-testid={`user-role-select-${userItem._id}`}
                        value={userItem.role}
                        onChange={(event) => handleUpdateUser(userItem._id, true, event.target.value)}
                      >
                        <option value="student">student</option>
                        <option value="instructor">instructor</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td><small>Jan 10, 2024</small></td>
                    <td>
                      <button 
                        className={`access-toggle ${courseAccess[`${userItem._id}-html`] ? 'locked' : 'granted'}`}
                        onClick={() => handleCourseAccessChange(userItem._id, 'html', !courseAccess[`${userItem._id}-html`])}
                      >
                        {courseAccess[`${userItem._id}-html`] ? '✕ Lock' : '✓ Grant'}
                      </button>
                    </td>
                    <td>
                      <button 
                        className={`access-toggle ${courseAccess[`${userItem._id}-js`] ? 'locked' : 'granted'}`}
                        onClick={() => handleCourseAccessChange(userItem._id, 'js', !courseAccess[`${userItem._id}-js`])}
                      >
                        {courseAccess[`${userItem._id}-js`] ? '✕ Lock' : '✓ Grant'}
                      </button>
                    </td>
                    <td>
                      <button 
                        className={`access-toggle ${courseAccess[`${userItem._id}-react`] ? 'locked' : 'granted'}`}
                        onClick={() => handleCourseAccessChange(userItem._id, 'react', !courseAccess[`${userItem._id}-react`])}
                      >
                        {courseAccess[`${userItem._id}-react`] ? '✕ Lock' : '✓ Grant'}
                      </button>
                    </td>
                    <td>
                      <button 
                        aria-label="Delete" 
                        className="btn-delete" 
                        onClick={() => handleDeleteUser(userItem._id)} 
                        data-testid={`delete-user-${userItem._id}`}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {toast && (
          <div role="alert" aria-live="polite">
            <div>{toast.message}</div>
          </div>
        )}
      </div>
    );
  };

  export default AdminDashboardScreen;