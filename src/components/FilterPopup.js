import React, { useState } from 'react';

const FilterPopup = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-popup" onClick={e => e.stopPropagation()}>
        <div className="filter-header">
          <h3>Filter Users</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="filter-content">
          <div className="filter-field">
            <label>First Name</label>
            <input
              type="text"
              value={filters.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Filter by first name"
            />
          </div>
          
          <div className="filter-field">
            <label>Last Name</label>
            <input
              type="text"
              value={filters.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Filter by last name"
            />
          </div>
          
          <div className="filter-field">
            <label>Email</label>
            <input
              type="text"
              value={filters.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Filter by email"
            />
          </div>
          
          <div className="filter-field">
            <label>Department</label>
            <input
              type="text"
              value={filters.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              placeholder="Filter by department"
            />
          </div>
        </div>
        
        <div className="filter-actions">
          <button onClick={handleReset} className="reset-btn">Reset</button>
          <button onClick={handleApply} className="apply-btn">Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
