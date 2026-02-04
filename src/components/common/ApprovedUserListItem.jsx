const ApprovedUserListItem = ({ userItem, handleUpdateUser, handleDeleteUser }) => (
    <li className="approved-list-item">
      <div className="list-user-info">
        <span className="user-name">{userItem.username}</span> 
        <span className="user-email">({userItem.email})</span>
        <span className="list-role approved-role role-value">{userItem.role}</span>
      </div>

      <div className="button-group-list">
        {/* Role Change Dropdown */}
        <select
            className="role-select"
            value={userItem.role}
            onChange={(e) => handleUpdateUser(userItem._id, true, e.target.value)}
        >
            <option value="student">Set Student</option>
            <option value="instructor">Set Instructor</option>
            {/* Admin role change should typically be done via a separate secure process */}
        </select>
        
        {/* Delete Button */}
        <button 
          className="btn btn-delete-small"
          onClick={() => handleDeleteUser(userItem._id)} 
        >
          Delete
        </button>
      </div>
    </li>
);

export default ApprovedUserListItem;