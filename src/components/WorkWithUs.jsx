import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/LanguageContext'
import './Pages.css'

function WorkWithUs() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  
  const expertise = language === 'en' 
    ? t('expertise')
    : t('expertise')

  // Direct navigation without loading
  const handleClose = () => {
    navigate('/')
  }

  return (
    <div className="page-container">
      <button 
        className="close-page-btn"
        onClick={handleClose}
        aria-label="Close page"
      >
        ×
      </button>
      
      <div className="page-sidebar">
        <div onClick={handleClose} style={{ cursor: 'pointer' }}>
          <img src={logohgroup} alt="HGROUP" className="page-logo" />
        </div>
        
        <div className="sidebar-content">
          <div className="page-nav">
            <span className="nav-dot active"></span>
            <span className="nav-item">{t('nav.workWithUs')}</span>
          </div>
          <div className="page-nav">
            <Link to="/join-us" className="nav-item">{t('nav.joinUs')}</Link>
          </div>
          <div className="page-nav">
            <a href="https://www.instagram.com/hgroupp_/" target="_blank" rel="noopener noreferrer" className="nav-item">
              {t('nav.followUs')} <span style={{fontSize: '0.8rem', marginLeft: '4px'}}>↗</span>
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
          <p>{t('workWithUs.text1')}</p>
          <p>{t('workWithUs.text2')}</p>
          <p>{t('workWithUs.text3')}</p>
          <p>{t('workWithUs.text4')}</p>
        </div>

        <div className="contact-section">
          <h3>{t('workWithUs.contact')}</h3>
          <a href="mailto:ENQUIRIES@HGROUP.COM" className="contact-email">ENQUIRIES@HGROUP.COM</a>
        </div>

        <div className="expertise-section">
          <h3>{t('workWithUs.ourHs')}</h3>
          <div className="h-list">
            {expertise.map((item, index) => (
              <div key={index} className="h-item">
                <div className="h-header">
                  <h4 className="h-name">{item.name}</h4>
                  <a href={`#${item.name.toLowerCase()}`} className="h-link">
                    {t('workWithUs.viewMore')} <span className="h-arrow">↗</span>
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