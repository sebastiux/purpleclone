import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logohgroup } from '../assets/logos'
import { useLanguage } from '../contexts/LanguageContext'
import './Pages.css'

function HundredVoices() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  
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
            <Link to="/work-with-us" className="nav-item">{t('nav.workWithUs')}</Link>
          </div>
          <div className="page-nav">
            <Link to="/join-us" className="nav-item">{t('nav.joinUs')}</Link>
          </div>
          <div className="page-nav">
            <span className="nav-dot active"></span>
            <span className="nav-item">100 VOCES</span>
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
          {/* Hero Section con número grande */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '50px',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: '8rem',
              fontWeight: '900',
              lineHeight: '0.8',
              margin: 0,
              background: 'linear-gradient(180deg, #000 0%, #403d39 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-5px'
            }}>
              100
            </h1>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              marginLeft: '20px',
              marginBottom: '0',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              lineHeight: '1',
              color: '#000'
            }}>
              VOCES
            </h2>
          </div>
          
          {/* Subtítulo destacado */}
          <p style={{ 
            fontSize: '1.4rem', 
            fontWeight: '300', 
            marginBottom: '50px',
            color: '#000',
            lineHeight: '1.5',
            maxWidth: '800px',
            letterSpacing: '0.5px'
          }}>
            {t('hundredVoices.subtitle')}
          </p>

          {/* Quote destacado */}
          <blockquote style={{
            borderLeft: '4px solid #000',
            paddingLeft: '30px',
            marginLeft: '0',
            marginBottom: '50px',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            lineHeight: '1.6',
            color: '#403d39'
          }}>
            {t('hundredVoices.quote')}
          </blockquote>
          
          {/* Descripción principal */}
          <div style={{
            display: 'grid',
            gap: '20px',
            marginBottom: '60px'
          }}>
            <p style={{ lineHeight: '1.8', color: '#403d39' }}>
              {t('hundredVoices.description1')}
            </p>
            
            <p style={{ lineHeight: '1.8', color: '#403d39' }}>
              {t('hundredVoices.description2')}
            </p>
          </div>

          {/* Ediciones */}
          <div style={{
            marginBottom: '60px',
            padding: '40px',
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
            borderRadius: '16px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '30px',
              color: '#000'
            }}>
              {t('hundredVoices.editionsTitle')}
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {t('hundredVoices.editions').map((edition, index) => (
                <div key={index} style={{
                  background: '#fff',
                  padding: '30px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '10px',
                    color: '#000',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {edition.title}
                  </h4>
                  <p style={{
                    fontSize: '0.95rem',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '15px'
                  }}>
                    {edition.description}
                  </p>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#999',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {edition.featured}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Book Details mejorado */}
        <div style={{
          marginTop: '60px',
          padding: '50px',
          background: '#000',
          color: '#fff',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Elemento decorativo */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%'
          }}></div>
          
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '35px',
            color: '#fff'
          }}>
            {t('hundredVoices.bookDetails')}
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px'
          }}>
            <div>
              <h4 style={{ 
                fontSize: '0.8rem', 
                color: '#CCC5B9', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {t('hundredVoices.format')}
              </h4>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                {t('hundredVoices.formatValue')}
              </p>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '0.8rem', 
                color: '#CCC5B9', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {t('hundredVoices.pages')}
              </h4>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>500+</p>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '0.8rem', 
                color: '#CCC5B9', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {t('hundredVoices.language')}
              </h4>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                {t('hundredVoices.languageValue')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section mejorado */}
        <div style={{ 
          marginTop: '60px',
          textAlign: 'center',
          padding: '50px 0'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '20px',
            color: '#666'
          }}>
            {t('hundredVoices.inquiries')}
          </h3>
          
          <a href="mailto:100voces@hgroup.com" style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#000',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            marginBottom: '40px'
          }}
          onMouseOver={(e) => {
            e.target.style.color = '#403d39';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = '#000';
            e.target.style.transform = 'translateY(0)';
          }}>
            100VOCES@HGROUP.COM
          </a>

          <div>
            <button style={{
              background: '#fff',
              color: '#000',
              padding: '18px 50px',
              border: '2px solid #000',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: '700',
              fontFamily: 'Visby CF, sans-serif',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#000';
              e.target.style.color = '#fff';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#fff';
              e.target.style.color = '#000';
              e.target.style.transform = 'translateY(0)';
            }}
            onClick={() => window.location.href = 'mailto:100voces@hgroup.com'}
            >
              {t('hundredVoices.requestInfo')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HundredVoices