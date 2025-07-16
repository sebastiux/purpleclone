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
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '900',
            marginBottom: '40px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            lineHeight: '1.1'
          }}>
            100 VOCES
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            fontWeight: '600', 
            marginBottom: '35px',
            color: '#000',
            lineHeight: '1.4'
          }}>
            {language === 'en' 
              ? 'The definitive book featuring the voices of Mexico\'s most influential business leaders and prominent figures.'
              : 'El libro definitivo que presenta las voces de los líderes empresariales y figuras más influyentes de México.'
            }
          </p>
          
          <p>
            {language === 'en'
              ? '100 Voces is an exclusive collection of testimonies, insights, and visions from Mexico\'s most distinguished entrepreneurs, innovators, and thought leaders. This carefully curated book captures the essence of Mexican leadership and entrepreneurial spirit.'
              : '100 Voces es una colección exclusiva de testimonios, perspectivas y visiones de los empresarios, innovadores y líderes de opinión más distinguidos de México. Este libro cuidadosamente curado captura la esencia del liderazgo y espíritu empresarial mexicano.'
            }
          </p>
          
          <p>
            {language === 'en'
              ? 'Through intimate conversations and profound reflections, readers gain unprecedented access to the minds that are shaping Mexico\'s economic and cultural landscape. Each voice represents a unique journey of success, resilience, and transformation.'
              : 'A través de conversaciones íntimas y reflexiones profundas, los lectores obtienen acceso sin precedentes a las mentes que están dando forma al panorama económico y cultural de México. Cada voz representa un viaje único de éxito, resiliencia y transformación.'
            }
          </p>
          
          <p>
            {language === 'en'
              ? 'From established industry titans to disruptive innovators, 100 Voces presents a comprehensive portrait of contemporary Mexican excellence, offering inspiration and wisdom for the next generation of leaders.'
              : 'Desde titanes establecidos de la industria hasta innovadores disruptivos, 100 Voces presenta un retrato integral de la excelencia mexicana contemporánea, ofreciendo inspiración y sabiduría para la próxima generación de líderes.'
            }
          </p>
        </div>

        <div className="book-details" style={{
          marginTop: '50px',
          padding: '40px',
          background: '#f8f8f8',
          borderRadius: '12px'
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '25px',
            color: '#000'
          }}>
            {language === 'en' ? 'BOOK DETAILS' : 'DETALLES DEL LIBRO'}
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                {language === 'en' ? 'FORMAT' : 'FORMATO'}
              </h4>
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>
                {language === 'en' ? 'Hardcover Edition' : 'Edición de Tapa Dura'}
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                {language === 'en' ? 'PAGES' : 'PÁGINAS'}
              </h4>
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>500+</p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                {language === 'en' ? 'LANGUAGE' : 'IDIOMA'}
              </h4>
              <p style={{ fontSize: '1rem', fontWeight: '600' }}>
                {language === 'en' ? 'Spanish' : 'Español'}
              </p>
            </div>
          </div>
        </div>

        <div className="contact-section" style={{ marginTop: '50px' }}>
          <h3>{language === 'en' ? 'INQUIRIES' : 'CONSULTAS'}</h3>
          <a href="mailto:100voces@hgroup.com" className="contact-email">100VOCES@HGROUP.COM</a>
        </div>

        <div style={{
          marginTop: '50px',
          textAlign: 'center',
          padding: '30px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <button style={{
            background: '#000',
            color: '#fff',
            padding: '15px 40px',
            border: 'none',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: '700',
            fontFamily: 'Visby CF, sans-serif',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#403d39'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#000'
            e.target.style.transform = 'translateY(0)'
          }}
          onClick={() => window.location.href = 'mailto:100voces@hgroup.com'}
          >
            {language === 'en' ? 'Request Information' : 'Solicitar Información'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HundredVoices