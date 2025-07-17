import React, { useEffect, useState } from 'react';
import './EmployeeDetailsForm.css';
import { formatEmployeeName } from './employeeUtils';

const EmployeeDetailsForm = ({ empId, onClose }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');

  // Fetch by ID (default)
  useEffect(() => {
    if (!empId) return;
    setLoading(true);
    setError(null);
    fetch(`/employee/${empId}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Failed to fetch employee. Status: ${response.status}. Body: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [empId]);

  // Search by name
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchName.trim()) return;
    setLoading(true);
    setError(null);
    setEmployee(null);
    fetch(`/employee/name/${encodeURIComponent(searchName.trim())}`)
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`No employee found with name '${searchName}'. Status: ${response.status}. Body: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (!empId && !employee) return (
    <div className="employee-details-form-container">
      <h3>Employee Details</h3>
      <form onSubmit={handleSearch} style={{marginBottom:'16px',display:'flex',gap:'8px'}}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          style={{flex:1,padding:'6px',borderRadius:'4px',border:'1px solid #ccc'}}
        />
        <button type="submit" className="close-btn">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}
    </div>
  );

  return (
    <div className="employee-details-form-container">
      <h3>Employee Details</h3>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}
      {employee && (
        <form>
          <div style={{marginBottom:'10px'}}>
            <label><strong>Employee ID:</strong></label>
            <input type="text" value={employee.empID || employee.id} readOnly style={{width:'100%',padding:'6px',marginTop:'4px'}} />
          </div>
          <div style={{marginBottom:'10px'}}>
            <label><strong>Name:</strong></label>
            <input type="text" value={employee.name} readOnly style={{width:'100%',padding:'6px',marginTop:'4px'}} />
          </div>
          <div style={{marginBottom:'10px'}}>
            <label><strong>Job/Role:</strong></label>
            <input type="text" value={employee.job || employee.role || ''} readOnly style={{width:'100%',padding:'6px',marginTop:'4px'}} />
          </div>
        </form>
      )}
      <button style={{marginTop:'12px',background:'#aaa',color:'#fff',border:'none',padding:'6px 16px',borderRadius:'5px',cursor:'pointer'}} onClick={onClose}>Close</button>
    </div>
  );
};

export default EmployeeDetailsForm;
