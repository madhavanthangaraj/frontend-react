import React from 'react';
import Header from './Header';
import './LandingPage.css';

const HomePage = () => (
  <>
    <Header />
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome!</h1>
        <div className="info-bar" style={{background:'#e3f2fd',color:'#1976d2',borderRadius:8,padding:'10px 18px',marginBottom:18,display:'flex',alignItems:'center',gap:10}}>
          <span role="img" aria-label="info" style={{fontSize:22}}>ℹ️</span>
          <span>Tip: Use the navigation bar above to manage employees, view details, and more.</span>
        </div>
        <p>You have successfully logged in to the Employee Management System.</p>
        <p>Here you can manage employees, view details, and more. (Add your dashboard here!)</p>
      </div>
    </div>
  </>
);

export default HomePage;
