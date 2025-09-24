import React, { useState, useEffect, useCallback } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import FilterPopup from './components/FilterPopup';
import Pagination from './components/Pagination';
import ErrorMessage from './components/ErrorMessage';
import { userService } from './services/api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [users, searchTerm, filters, sortConfig]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = useCallback(() => {
    let result = [...users];

    if (searchTerm) {
      result = result.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(user =>
          user[key].toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'id') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [users, searchTerm, filters, sortConfig]);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        setError('');
      } catch (err) {
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        const updatedUser = await userService.updateUser(editingUser.id, userData);
        setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
      } else {
        const newUser = await userService.createUser(userData);
        setUsers([...users, newUser]);
      }
      setShowUserForm(false);
      setError('');
    } catch (err) {
      setError('Failed to save user. Please try again.');
    }
  };

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(filteredUsers.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

  return (
    <div className="app">
      <div className="container">
        <h1>User Management System</h1>
        
        <ErrorMessage message={error} onClose={() => setError('')} />
        
        <div className="controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="action-buttons">
            <button onClick={() => setShowFilterPopup(true)} className="filter-btn">
              Filter
            </button>
            <button onClick={handleAddUser} className="add-btn">
              Add User
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <>
            <UserList
              users={paginatedUsers}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            
            {filteredUsers.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                limit={limit}
                onLimitChange={setLimit}
              />
            )}
          </>
        )}
        
        {showUserForm && (
          <UserForm
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={() => setShowUserForm(false)}
          />
        )}
        
        <FilterPopup
          isOpen={showFilterPopup}
          onClose={() => setShowFilterPopup(false)}
          onApplyFilters={setFilters}
          currentFilters={filters}
        />
      </div>
    </div>
  );
}

export default App;
