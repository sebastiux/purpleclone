import { useState, useEffect } from 'react'
import { logos, images } from './assets'
import './App.css'

function App() {
  const [showMainHeader, setShowMainHeader] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [gridColumns, setGridColumns] = useState(3)
  const [showPresentation, setShowPresentation] = useState(true)

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
    }, 4500) // Show for 4.5 seconds total
    return () => clearTimeout(timer)
  }, [])

  const handleZoomOut = () => {
    setGridColumns(prev => Math.min(prev + 1, 7))
  }

  const handleZoomIn = () => {
    setGridColumns(prev => Math.max(prev - 1, 1))
  }

  return (
    <div className="App">
      {/* Presentation Message */}
      {showPresentation && (
        <div className="presentation-overlay">
          <h1 className="presentation-text">
            Welcome to HGROUP Creative Studio
          </h1>
        </div>
      )}

      {/* Compact Main Header */}
      <header className={`main-header ${!showMainHeader ? 'hidden' : ''}`}>
        <div className="header-content">
          <div className="logo-container">
            <h1 className="logo">HGROUP</h1>
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

      {/* Holdings Submenu - White background */}
      <section className={`holdings-menu ${!showMainHeader ? 'fixed' : ''}`}>
        <div className="holdings-container">
          {logos.holdingsLogos.map((holding, index) => (
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

      {/* Rest of your component remains the same */}
      {/* Horizontal Navigation */}
      <nav className={`horizontal-nav ${!showMainHeader ? 'visible' : ''}`}>
        <div className="nav-content">
          <div className="logo-small">HGROUP</div>
          <ul className="horizontal-nav-list">
            <li><a href="#">WORK WITH US</a></li>
            <li><a href="#">ABOUT US</a></li>
            <li><a href="#">CONTACT US</a></li>
            <li><a href="#">100 VOICES</a></li>
            <li><a href="#">FOLLOW US</a></li>
          </ul>
        </div>
      </nav>

      {/* Vertical Zoom Controls - Always visible */}
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
            style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
          >
            {images.allPortfolioItems.map((project, index) => (
              <div key={project.id} className="portfolio-item">
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
                <div className="project-overlay">
                  <h3>{project.name}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App