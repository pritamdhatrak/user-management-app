import React from 'react';

const UserList = ({ users, onEdit, onDelete, sortConfig, onSort }) => {
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSort(key, direction);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return '↕';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {getSortIcon('id')}
            </th>
            <th onClick={() => handleSort('firstName')}>
              First Name {getSortIcon('firstName')}
            </th>
            <th onClick={() => handleSort('lastName')}>
              Last Name {getSortIcon('lastName')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {getSortIcon('email')}
            </th>
            <th onClick={() => handleSort('department')}>
              Department {getSortIcon('department')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => onEdit(user)} className="edit-btn">Edit</button>
                <button onClick={() => onDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="no-users">No users found</div>
      )}
    </div>
  );
};

export default UserList;
