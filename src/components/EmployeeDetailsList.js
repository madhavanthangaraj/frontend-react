import React, { useEffect, useState } from 'react';
import EmployeeDetailsForm from './EmployeeDetailsForm';

const EmployeeDetailsList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/employee')
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Failed to fetch employees. Status: ${response.status}. Body: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{marginTop:'32px'}}>
      <h2>All Employee Details</h2>
      {loading && <p>Loading all employees...</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}
      {!loading && !error && employees.length === 0 && <p>No employees found.</p>}
      {!loading && !error && employees.length > 0 && (
        <div style={{display:'flex',flexWrap:'wrap',gap:'24px'}}>
          {employees.map(emp => (
            <EmployeeDetailsForm key={emp.empID || emp.id} empId={emp.empID || emp.id} onClose={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsList;
