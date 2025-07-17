import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import './HomePage.css';
import EmployeeDetailsForm from './EmployeeDetailsForm';
import EmployeeDetailsList from './EmployeeDetailsList';

const HomePage = () => {
  // ...existing state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', job: '' });
  const [displayEmployee, setDisplayEmployee] = useState(null);

  // Display employee details
  const handleDisplayEmployee = (emp) => {
    setDisplayEmployee(emp);
  };
  const closeDisplayEmployee = () => setDisplayEmployee(null);

  // Start editing an employee
  const startEdit = (emp) => {
    setEditingId(emp.empID || emp.id);
    setEditData({ name: emp.name, job: emp.job || '' });
  };

  // Cancel editing
  const cancelEdit = (e) => {
    if (e) e.preventDefault();
    setEditingId(null);
    setEditData({ name: '', job: '' });
  };

  // Update employee handler
  const handleUpdateEmployee = (empID) => {
    fetch(`/employee/${empID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            alert(`Failed to update employee. Status: ${response.status}. Body: ${text}`);
            throw new Error(text);
          });
        }
        // Update employee in state
        setEmployees((prev) => prev.map(emp =>
          (emp.empID || emp.id) === empID ? { ...emp, ...editData } : emp
        ));
        setEditingId(null);
        setEditData({ name: '', job: '' });
      })
      .catch((error) => {
        alert('Error updating employee: ' + error.message);
      });
  };

  // Delete employee handler
  const handleDeleteEmployee = (empID, name) => {
    if (!window.confirm(`Are you sure you want to delete employee '${name}' (ID: ${empID})?`)) return;
    fetch(`/employee/${empID}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            alert(`Failed to delete employee. Status: ${response.status}. Body: ${text}`);
            throw new Error(text);
          });
        }
        // Remove from local state
        setEmployees((prev) => prev.filter(emp => (emp.empID || emp.id) !== empID));
      })
      .catch((error) => {
        alert('Error deleting employee: ' + error.message);
      });
  };

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEmployeeList, setShowEmployeeList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered employees based on search
  const filteredEmployees = employees.filter(emp =>
    emp.name && emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Most recently added employee
  const latestEmployee = employees.length > 0 ? employees[employees.length - 1] : null;

  // Refresh employees
  const handleRefresh = () => {
    if (showEmployeeList) handleShowEmployees();
  };

  const navigate = useNavigate();

  // Show Employees handler
  const handleShowEmployees = () => {
    setShowEmployeeList(true);
    setLoading(true);
    setError(null);
    setEmployees([]);
    fetch('/employee')
      .then((response) => {
        console.log('Fetch /employee status:', response.status);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Network response was not ok. Status: ${response.status}. Body: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="landing-container">
      <div className="homepage-banner" style={{background:'#4f8cff',color:'#fff',padding:'32px 0 16px 0',borderRadius:'0 0 16px 16px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
        <h1 style={{marginBottom:'8px'}}>Employee Management System</h1>
        <p style={{marginBottom:'0',fontSize:'18px'}}>Manage your workforce efficiently and securely</p>
        <div style={{marginTop:'16px',display:'flex',justifyContent:'center',gap:'32px'}}>
          <div style={{background:'#fff',color:'#4f8cff',padding:'12px 24px',borderRadius:'8px',boxShadow:'0 1px 4px rgba(0,0,0,0.07)',fontWeight:'bold'}}>Employees: {employees.length}</div>
          <div style={{background:'#fff',color:'#4f8cff',padding:'12px 24px',borderRadius:'8px',boxShadow:'0 1px 4px rgba(0,0,0,0.07)',fontWeight:'bold'}}>Active: {employees.filter(e => e.active !== false).length}</div>
        </div>
      </div>
      <div className="landing-content">
        <h1>Welcome!</h1>
        <p>You have successfully logged in to the Employee Management System.</p>
        <p>Here you can manage employees, view details, and more.</p>
        <button className="home-btn" onClick={handleShowEmployees} disabled={loading}>Show Employees</button>
        <button className="home-btn" onClick={() => navigate('/add-employee')}>Add Employee</button>
        {showEmployeeList && (
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'16px',margin:'20px 0'}}>
              <input
                type="text"
                placeholder="Search employee by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{padding:'8px',borderRadius:'6px',border:'1px solid #bbb',minWidth:'220px'}}
              />
              <button style={{background:'#1976d2',color:'#fff',border:'none',padding:'6px 16px',borderRadius:'5px',cursor:'pointer'}} onClick={handleRefresh} disabled={loading}>Refresh</button>
            </div>
            {latestEmployee && (
              <div style={{background:'#e3f2fd',padding:'12px 20px',borderRadius:'8px',marginBottom:'18px',boxShadow:'0 1px 4px rgba(0,0,0,0.07)',maxWidth:'400px'}}>
                <strong>Latest Employee:</strong> {latestEmployee.name} ({latestEmployee.job || latestEmployee.role || '-'})
              </div>
            )}
            <h2>Employee Names</h2>
            {loading && <p>Loading employees...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {!loading && !error && employees.length === 0 && <p>No employees found.</p>}
            {!loading && !error && employees.length > 0 && (
              <table className="employee-table" style={{width:'100%', borderCollapse:'collapse', marginTop:'16px'}}>
                <thead>
                  <tr style={{background:'#f5f5f5'}}>
                    <th style={{border:'1px solid #ddd', padding:'8px'}}>Employee ID</th>
                    <th style={{border:'1px solid #ddd', padding:'8px'}}>Name</th>
                    <th style={{border:'1px solid #ddd', padding:'8px'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.empID || emp.id}>
                      <td style={{border:'1px solid #ddd', padding:'8px'}}>{emp.empID || emp.id}</td>
                      <td style={{border:'1px solid #ddd', padding:'8px'}}>{editingId === (emp.empID || emp.id) ? (
                        <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} />
                      ) : emp.name}</td>
                      <td style={{border:'1px solid #ddd', padding:'8px'}}>
                        {editingId === (emp.empID || emp.id) ? (
                          <>
                            <input type="text" value={editData.job} onChange={e => setEditData({...editData, job: e.target.value})} placeholder="Job" style={{marginRight:'8px'}} />
                            <button style={{background:'#388e3c',color:'#fff',border:'none',padding:'6px 12px',borderRadius:'5px',cursor:'pointer',marginRight:'6px'}} onClick={() => handleUpdateEmployee(emp.empID || emp.id)}>Save</button>
                            <button style={{background:'#aaa',color:'#fff',border:'none',padding:'6px 12px',borderRadius:'5px',cursor:'pointer'}} onClick={cancelEdit}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button style={{background:'#1976d2',color:'#fff',border:'none',padding:'6px 12px',borderRadius:'5px',cursor:'pointer',marginRight:'6px'}} onClick={() => startEdit(emp)}>Update</button>
                            <button style={{background:'#d32f2f',color:'#fff',border:'none',padding:'6px 12px',borderRadius:'5px',cursor:'pointer',marginRight:'6px'}} onClick={() => handleDeleteEmployee(emp.empID || emp.id, emp.name)}>Delete</button>
                            <button style={{background:'#6d4cff',color:'#fff',border:'none',padding:'6px 12px',borderRadius:'5px',cursor:'pointer'}} onClick={() => handleDisplayEmployee(emp)}>
                              Display
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {displayEmployee && (
          <EmployeeDetailsForm empId={displayEmployee.empID || displayEmployee.id} onClose={closeDisplayEmployee} />
        )}
        <EmployeeDetailsList />
      </div>
    </div>
  );
};

export default HomePage;
