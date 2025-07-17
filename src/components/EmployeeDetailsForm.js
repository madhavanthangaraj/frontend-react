import React, { useEffect, useState } from 'react';

const EmployeeDetailsForm = ({ empId, onClose }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (!empId) return null;

  return (
    <div style={{marginTop:'24px',padding:'20px',background:'#f6f6fa',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)',maxWidth:'400px'}}>
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
