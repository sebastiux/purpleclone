import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import './Pages.css'

function JoinUs() {
  const navigate = useNavigate()
  
  const openings = [
    {
      title: 'MARKETING MANAGER - DIGITAL',
      location: 'LONDON',
      description: `IF YOU'VE GOT A SIXTH SENSE FOR WHAT MAKES PEOPLE CLICK, SCROLL, AND ENGAGE — KEEP READING. HGROUP IS ON THE HUNT FOR A MARKETING MANAGER WHO'S EQUAL PARTS STRATEGIST AND STORYTELLER. WE'RE NOT LOOKING FOR SOMEONE TO JUST "MANAGE CHANNELS." WE WANT SOMEONE WHO CAN SHAPE THEM. SOMEONE WHO KNOWS HOW TO TURN A POST INTO A CONVERSATION.`,
      applyLink: 'https://www.linkedin.com'
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
            <Link to="/work-with-us" className="nav-item">WORK WITH US</Link>
          </div>
          <div className="page-nav">
            <span className="nav-dot active"></span>
            <Link to="/join-us" className="nav-item">JOIN US</Link>
          </div>
          <div className="page-nav">
            <a href="#" className="nav-item">FOLLOW US</a>
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
            We are a team of creators and innovators. We know there is more than one way to get things done, and 
            we cultivate a range of diverse perspectives. HGROUP is always growing and seeking new talent to join 
            our global community.
          </p>
          <p>
            Please click <strong>here</strong> to see our current vacancies, or for any general enquiries, please email 
            careers@hgroup.com
          </p>
        </div>

        <div className="filter-buttons">
          <button className="filter-btn active">ALL LOCATIONS</button>
          <button className="filter-btn">LONDON</button>
        </div>

        <div className="job-listings">
          {openings.map((job, index) => (
            <div key={index} className="job-item">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-location">{job.location}</p>
              <p className="job-description">{job.description}</p>
              <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-link">
                APPLY ON LINKEDIN <span className="arrow">↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JoinUs