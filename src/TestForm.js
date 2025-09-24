import React, { useState } from "react";

const TestForm = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management - WORKING VERSION</h1>
      <button 
        onClick={() => setShowForm(true)}
        style={{ 
          padding: "10px 20px", 
          backgroundColor: "#3498db", 
          color: "white", 
          border: "none", 
          borderRadius: "4px"
        }}
      >
        Add User (WITH DROPDOWNS)
      </button>
      
      {showForm && (
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: "rgba(0,0,0,0.7)", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center" 
        }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "8px", width: "400px" }}>
            <h2>Add New User - DROPDOWN VERSION</h2>
            <div style={{ marginBottom: "15px" }}>
              <label>First Name</label>
              <select style={{ width: "100%", padding: "10px", border: "1px solid #ddd" }}>
                <option>Select Indian First Name</option>
                <option>Aarav</option>
                <option>Aditi</option>
                <option>Akash</option>
                <option>Amit</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Last Name</label>
              <select style={{ width: "100%", padding: "10px", border: "1px solid #ddd" }}>
                <option>Select Indian Last Name</option>
                <option>Agarwal</option>
                <option>Sharma</option>
                <option>Gupta</option>
                <option>Singh</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Email</label>
              <input type="email" style={{ width: "100%", padding: "10px", border: "1px solid #ddd" }} />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Department</label>
              <select style={{ width: "100%", padding: "10px", border: "1px solid #ddd" }}>
                <option>Select IT Department</option>
                <option>Software Development</option>
                <option>Web Development</option>
                <option>Data Science</option>
              </select>
            </div>
            <button onClick={() => setShowForm(false)} style={{ padding: "10px 20px", backgroundColor: "#95a5a6", color: "white", border: "none", marginRight: "10px" }}>Cancel</button>
            <button style={{ padding: "10px 20px", backgroundColor: "#27ae60", color: "white", border: "none" }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestForm;
