import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({ name: '', job: '' });
  const [addEmpMsg, setAddEmpMsg] = useState('');
  const [addEmpError, setAddEmpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameValid, setNameValid] = useState(true);
  const navigate = useNavigate();

  const jobRoles = ['Software Engineer', 'Designer', 'Manager', 'HR', 'QA Tester'];

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setAddEmpMsg('');
    setAddEmpError('');
    setLoading(true);
    fetch('/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee)
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Failed to add employee. Status: ${response.status}. Body: ${text}`);
          });
        }
        return response.text();
      })
      .then((msg) => {
        setAddEmpMsg(msg || 'Employee added successfully!');
        setNewEmployee({ name: '', job: '' });
      })
      .catch((error) => {
        setAddEmpError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // Real-time name validation
  const handleNameChange = (e) => {
    const val = e.target.value;
    setNewEmployee(prev => ({...prev, name: val}));
    setNameValid(/^[A-Za-z ]{3,}$/.test(val));
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleAddEmployee}>
        <button type="button" style={{marginBottom:'12px',background:'#4f8cff',color:'#fff',border:'none',padding:'6px 18px',borderRadius:'5px',cursor:'pointer'}} onClick={() => setNewEmployee({ name: 'John Doe', job: 'Software Engineer' })}>Auto-Fill Sample</button>
        <div>
          <label>Name:</label>
          <input type="text" value={newEmployee.name} onChange={handleNameChange} required style={{borderColor: nameValid ? '#ccc' : 'red'}} />
          {!nameValid && <span style={{color:'red',fontSize:'13px'}}>Name must be at least 3 letters and only letters/spaces.</span>}
        </div>
        <div>
          <label>Job:</label>
          <select value={newEmployee.job} onChange={e => setNewEmployee({...newEmployee, job: e.target.value})} required style={{padding:'6px',borderRadius:'4px',border:'1px solid #ccc'}}>
            <option value="">Select job role</option>
            {jobRoles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
        <button type="submit" disabled={loading || !nameValid}>{loading ? 'Submitting...' : 'Submit'}</button>
        {loading && <span style={{marginLeft:'12px'}}><svg width="22" height="22" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="#4f8cff" strokeWidth="5" strokeDasharray="31.4 31.4" transform="rotate(-90 25 25)"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" /></circle></svg></span>}
        {addEmpMsg && <span className="success">{addEmpMsg}</span>}
        {addEmpError && <span className="error">{addEmpError}</span>}
      </form>
      <button className="back-btn" onClick={() => navigate('/home')}>Back to Home</button>
    </div>
  );
};

export default AddEmployee;
