import { useState, useEffect } from 'react'
import { logohgroup, holdingsLogos } from './assets/logos'
import { images } from './assets'
import './App.css'

function App() {
  const [showMainHeader, setShowMainHeader] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [gridColumns, setGridColumns] = useState(3)
  const [showPresentation, setShowPresentation] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (scrollY > 50) {
      setShowMainHeader(false)
    } else {
      setShowMainHeader(true)
    }
  }, [scrollY])

  // Hide presentation message after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPresentation(false)
    }, 4500)
    return () => clearTimeout(timer)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject])

  const handleZoomOut = () => {
    setGridColumns(prev => Math.min(prev + 1, 7))
  }

  const handleZoomIn = () => {
    setGridColumns(prev => Math.max(prev - 1, 1))
  }

  const openProject = (project) => {
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  return (
    <div className="App">
      {/* Presentation Message with Logo */}
      {showPresentation && (
        <div className="presentation-overlay">
          <div className="presentation-content">
            <h1 className="presentation-text">
              Welcome to HGROUP Creative Studio
            </h1>
            <img 
              src={logohgroup} 
              alt="HGROUP" 
              className="presentation-logo"
            />
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className={`main-header ${!showMainHeader ? 'hidden' : ''}`}>
        <div className="header-content">
          <div className="logo-container">
            <img 
              src={logohgroup} 
              alt="HGROUP" 
              className="logo"
            />
          </div>
          
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="nav-text">WORK WITH US</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="nav-text">JOIN US</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="nav-text">FOLLOW US →</span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="view-work-btn">
            <button>VIEW WORK BY :</button>
          </div>
        </div>
      </header>

      {/* Holdings Submenu */}
      <section className={`holdings-menu ${!showMainHeader ? 'fixed' : ''}`}>
        <div className="holdings-container">
          {holdingsLogos.map((holding, index) => (
            <div 
              key={holding.id} 
              className="holding-item"
              style={{ animationDelay: `${2.5 + index * 0.2}s` }}
            >
              <img 
                src={holding.logo} 
                alt={holding.alt} 
                className="holding-logo"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="holding-placeholder" style={{ display: 'none' }}>
                {holding.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Navigation */}
      <nav className={`horizontal-nav ${!showMainHeader ? 'visible' : ''}`}>
        <div className="nav-content">
          <img 
            src={logohgroup} 
            alt="HGROUP" 
            className="logo-small"
          />
          
          {/* Hamburger button for mobile */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul className={`horizontal-nav-list ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#">WORK WITH US</a></li>
            <li><a href="#">ABOUT US</a></li>
            <li><a href="#">CONTACT US</a></li>
            <li><a href="#">100 VOICES</a></li>
            <li><a href="#">FOLLOW US</a></li>
          </ul>
        </div>
      </nav>

      {/* Vertical Zoom Controls */}
      <div className="zoom-controls">
        <button 
          className="zoom-btn zoom-plus"
          onClick={handleZoomIn}
          disabled={gridColumns === 1}
        >
          +
        </button>
        <div className="zoom-divider"></div>
        <button 
          className="zoom-btn zoom-minus"
          onClick={handleZoomOut}
          disabled={gridColumns === 7}
        >
          −
        </button>
      </div>

      {/* Portfolio Grid */}
      <main className="main-content">
        <section className="portfolio-section">
          <div 
            className="portfolio-masonry"
            data-columns={gridColumns}
          >
            {images.allPortfolioItems.map((project, index) => (
              <div 
                key={project.id} 
                className="portfolio-item"
                onClick={() => openProject(project)}
              >
                {project.type === 'image' ? (
                  <img 
                    src={project.image} 
                    alt={project.alt}
                    className="portfolio-image"
                  />
                ) : (
                  <video 
                    src={project.video}
                    className="portfolio-video"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                )}
                <div className="project-info">
                  <span className="project-tag">{project.name}</span>
                  <span className="project-tag">{project.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fullscreen Modal */}
      {selectedProject && (
        <div className="fullscreen-modal" onClick={closeProject}>
          <button className="close-modal" onClick={closeProject}>
            ×
          </button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedProject.type === 'image' ? (
              <img 
                src={selectedProject.image} 
                alt={selectedProject.alt}
                className="modal-image"
              />
            ) : (
              <video 
                src={selectedProject.video}
                className="modal-video"
                controls
                autoPlay
                loop
              />
            )}
            <div className="modal-info">
              <span className="modal-tag">{selectedProject.name}</span>
              <span className="modal-tag">{selectedProject.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App