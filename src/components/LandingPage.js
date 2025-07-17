import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="landing-container">
        <div className="landing-content">
          <h1>Welcome to EMS</h1>
          <div className="info-bar" style={{background:'#e3f2fd',color:'#1976d2',borderRadius:8,padding:'10px 18px',marginBottom:18,display:'flex',alignItems:'center',gap:10}}>
            <span role="img" aria-label="info" style={{fontSize:22}}>👋</span>
            <span>Tip: Click "Get Started" to create your account and begin managing employees.</span>
          </div>
          <p>Employee Management System made simple and secure.</p>
          <button className="get-started-btn" style={{background:'#1976d2',color:'#fff',fontWeight:600,padding:'10px 32px',borderRadius:6,fontSize:'1.1rem',boxShadow:'0 2px 8px rgba(25,118,210,0.08)'}} onClick={() => navigate('/register')}>Get Started</button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
