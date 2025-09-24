import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  
  const [errors, setErrors] = useState({});

  const itDepartments = [
    'Software Development', 'Web Development', 'Mobile App Development', 'Data Science',
    'Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing',
    'DevOps', 'Quality Assurance', 'UI/UX Design', 'Product Management', 'Business Analysis',
    'Technical Support', 'Network Administration', 'Database Administration', 'IT Support',
    'Frontend Development', 'Backend Development', 'Full Stack Development', 'Game Development',
    'Blockchain Development', 'IoT Development', 'System Administration', 'IT Consulting'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name should contain only letters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name should contain only letters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    } else if (!itDepartments.includes(formData.department)) {
      newErrors.department = 'Please select a valid IT department';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const emailDomain = formData.email.includes('@') ? formData.email : 
        `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@gmail.com`;
      
      onSave({
        ...formData,
        email: formData.email.includes('@') ? formData.email : emailDomain
      });
    }
  };

  return (
    <div className="user-form-overlay" onClick={onCancel}>
      <div className="user-form" onClick={e => e.stopPropagation()}>
        <h2>{user ? 'Edit User' : 'Add New User'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'error' : ''}
              placeholder="First Name"
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'error' : ''}
              placeholder="Last Name"
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'error' : ''}
              placeholder="Enter Email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className={errors.department ? 'error' : ''}
            >
              <option value="">Select IT Department</option>
              {itDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <span className="error-text">{errors.department}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
