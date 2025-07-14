import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import './Pages.css'

function WorkWithUs() {
  const navigate = useNavigate()
  
  const expertise = [
    { 
      name: 'HEART', 
      description: 'Passionate creativity that connects emotionally',
      link: '#heart'
    },
    { 
      name: 'HEAD', 
      description: 'Strategic thinking that drives results',
      link: '#head'
    },
    { 
      name: 'HANDS', 
      description: 'Flawless execution that delivers excellence',
      link: '#hands'
    },
    { 
      name: 'HERO', 
      description: 'Bold ideas that stand out',
      link: '#hero'
    },
    { 
      name: 'HUB', 
      description: 'Connected ecosystem of talent and resources',
      link: '#hub'
    },
    { 
      name: 'HUMAN', 
      description: 'Authentic experiences that resonate',
      link: '#human'
    },
    { 
      name: 'HALO', 
      description: 'Positive impact that elevates brands',
      link: '#halo'
    }
  ]

  return (
    <div className="page-container">
      <button 
        className="close-page-btn"
        onClick={() => navigate('/')}
        aria-label="Close page"
      >
        ×
      </button>
      
      <div className="page-sidebar">
        <Link to="/">
          <img src={logohgroup} alt="HGROUP" className="page-logo" />
        </Link>
        
        <div className="sidebar-content">
          <div className="page-nav">
            <span className="nav-dot active"></span>
            <Link to="/" className="nav-item">WORK WITH US</Link>
          </div>
          <div className="page-nav">
            <Link to="/join-us" className="nav-item">JOIN US</Link>
          </div>
          <div className="page-nav">
            <a href="https://www.instagram.com/hgroupp_/" target="_blank" rel="noopener noreferrer" className="nav-item">
              FOLLOW US <span style={{fontSize: '0.8rem', marginLeft: '4px'}}>↗</span>
            </a>
          </div>
          
          <div className="social-links">
            <a 
              href="https://www.instagram.com/hgroupp_/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              IG
            </a>
            <a 
              href="https://www.linkedin.com/company/herohgroup/posts/?feedView=all" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              IN
            </a>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="content-text">
          <p>
            HGROUP understands the world of luxury, offering connected services across Press, Communications, 
            Social Media, Events, VIP, Creative Strategy, Brand Strategy and Talent Partnerships. Culturally fluent and 
            hyper-connected, we partner with our clients to create maximum impact.
          </p>
          <p>
            Bringing together 25 years of strategic brand building experience with next generation in-house talent, we 
            deliver creative thinking and game-changing ideas to drive commercial success.
          </p>
          <p>
            Our clients span multiple divisions including Art, Design & Culture, Beauty & Wellbeing, Fashion & 
            Jewellery, Restaurants & Bars, Property & Placemaking, Events, Charity and Sustainability.
          </p>
          <p>
            Our commitment to sustainability is a core agency value and we continue to introduce business practices 
            to reduce our clients' impact.
          </p>
        </div>

        <div className="contact-section">
          <h3>CONTACT</h3>
          <a href="mailto:ENQUIRIES@HGROUP.COM" className="contact-email">ENQUIRIES@HGROUP.COM</a>
        </div>

        <div className="expertise-section">
          <h3>OUR H'S</h3>
          <div className="h-list">
            {expertise.map((item, index) => (
              <div key={index} className="h-item">
                <div className="h-header">
                  <h4 className="h-name">{item.name}</h4>
                  <a href={item.link} className="h-link">
                    VIEW MORE <span className="h-arrow">↗</span>
                  </a>
                </div>
                <p className="h-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkWithUs