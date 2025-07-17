import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to EMS</h1>
        <p style={{fontSize:'18px',marginBottom:'16px'}}>Employee Management System made simple and secure.</p>
        <h3 style={{color:'#4f8cff',margin:'16px 0 8px 0'}}>Why EMS?</h3>
        <ul style={{textAlign:'left',maxWidth:'400px',margin:'0 auto 16px auto',color:'#333'}}>
          <li>✔️ Easy employee management</li>
          <li>✔️ Secure and reliable</li>
          <li>✔️ Fast onboarding</li>
          <li>✔️ Modern UI</li>
        </ul>
        <button className="get-started-btn" onClick={() => navigate('/register')}>Get Started</button>
      </div>
      <div style={{marginTop:'32px',textAlign:'center'}}>
        <h4 style={{color:'#555'}}>What our users say</h4>
        <blockquote style={{fontStyle:'italic',color:'#333',margin:'12px auto',maxWidth:'480px'}}>
          "EMS has made managing our team effortless and fun!"<br/>
          <span style={{fontWeight:'bold',color:'#4f8cff'}}>– HR Manager, TechCorp</span>
        </blockquote>
        <blockquote style={{fontStyle:'italic',color:'#333',margin:'12px auto',maxWidth:'480px'}}>
          "The best employee portal we've ever used. Highly recommended!"<br/>
          <span style={{fontWeight:'bold',color:'#4f8cff'}}>– CEO, InnovateX</span>
        </blockquote>
      </div>
      <footer style={{marginTop:'40px',padding:'16px 0',background:'#f5f5f5',color:'#888',borderRadius:'0 0 12px 12px',textAlign:'center',fontSize:'15px'}}>
        &copy; 2025 EMS | Contact: support@ems.com
      </footer>
    </div>
  );
};

export default LandingPage;
