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
  
  // Enhanced Filter states for combination
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])

  // Shuffle function for random order
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Get unique categories (H's) from portfolio
  const getUniqueCategories = () => {
    if (!images.allPortfolioItems) return []
    const categories = [...new Set(images.allPortfolioItems.map(item => item.category))]
    return categories.filter(cat => cat).sort()
  }

  const getUniqueCompanies = () => {
    if (!images.allPortfolioItems) return []
    // Only get companies from portfolio items, not holdings
    const portfolioCompanies = images.allPortfolioItems.map(item => item.company).filter(comp => comp)
    const allCompanies = [...new Set(portfolioCompanies)]
    return allCompanies.sort()
  }

  // Filter projects based on selected categories and companies (no limit)
  useEffect(() => {
    if (!images.allPortfolioItems) {
      setFilteredProjects([])
      return
    }

    let filtered = [...images.allPortfolioItems]
    
    // Apply category filters (H's)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => 
        selectedCategories.includes(item.category)
      )
    }
    
    // Apply company filters
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter(item => 
        selectedCompanies.includes(item.company)
      )
    }
    
    // Always shuffle for random order and show all results
    const shuffled = shuffleArray(filtered)
    setFilteredProjects(shuffled)
  }, [selectedCategories, selectedCompanies])

  // Initial shuffle on mount (show all projects)
  useEffect(() => {
    if (images.allPortfolioItems) {
      const shuffled = shuffleArray([...images.allPortfolioItems])
      setFilteredProjects(shuffled)
    }
  }, [])

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPresentation(false)
    }, 4500)
    return () => clearTimeout(timer)
  }, [])

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

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterMenu && !event.target.closest('.view-work-btn')) {
        setShowFilterMenu(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showFilterMenu])

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

  // Handle category filter toggle
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  // Handle company filter toggle
  const handleCompanyToggle = (company) => {
    setSelectedCompanies(prev => {
      if (prev.includes(company)) {
        return prev.filter(comp => comp !== company)
      } else {
        return [...prev, company]
      }
    })
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedCompanies([])
    setShowFilterMenu(false) // Close the filter menu after clearing
  }

  // Handle holdings click
  const handleHoldingClick = (holdingName) => {
    handleCompanyToggle(holdingName)
  }

  // Get display text for current filters
  const getFilterDisplayText = () => {
    const totalFilters = selectedCategories.length + selectedCompanies.length
    
    if (totalFilters === 0) return 'All Work'
    if (totalFilters === 1) {
      if (selectedCategories.length === 1) return selectedCategories[0].toUpperCase()
      if (selectedCompanies.length === 1) return selectedCompanies[0].toUpperCase()
    }
    
    return `${totalFilters} Filters Active`
  }

  // Get active filter count
  const getActiveFilterCount = () => {
    return selectedCategories.length + selectedCompanies.length
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
            <p className="presentation-tagline">Conectamos lo imposible</p>
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
                  <span className="nav-text">ABOUT US</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <span className="nav-text">CONTACT US</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Enhanced View Work Filter Menu */}
          <div className="view-work-btn">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`filter-toggle ${getActiveFilterCount() > 0 ? 'has-filters' : ''}`}
            >
              VIEW WORK BY : {getFilterDisplayText()}
              {getActiveFilterCount() > 0 && (
                <span className="filter-count">{getActiveFilterCount()}</span>
              )}
              <span className={`arrow ${showFilterMenu ? 'up' : 'down'}`}>▼</span>
            </button>
            
            {showFilterMenu && (
              <div className="filter-dropdown">
                <div className="filter-dropdown-content">
                  {/* Clear All Button */}
                  {getActiveFilterCount() > 0 && (
                    <div className="filter-actions">
                      <button 
                        onClick={clearAllFilters}
                        className="clear-all-btn"
                      >
                        Clear All ({getActiveFilterCount()})
                      </button>
                    </div>
                  )}
                  
                  {/* Categories Section - Now showing H's */}
                  {getUniqueCategories().length > 0 && (
                    <div className="filter-section">
                      <h4>By H</h4>
                      {getUniqueCategories().map(category => (
                        <label key={category} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                          />
                          <span className="checkmark"></span>
                          <span className="filter-label">{category}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {/* Companies Section */}
                  <div className="filter-section">
                    <h4>By Company</h4>
                    {getUniqueCompanies().map(company => (
                      <label key={company} className="filter-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedCompanies.includes(company)}
                          onChange={() => handleCompanyToggle(company)}
                        />
                        <span className="checkmark"></span>
                        <span className="filter-label">{company}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Holdings Submenu */}
      <section className={`holdings-menu ${!showMainHeader ? 'fixed' : ''}`}>
        <div className="holdings-container">
          {holdingsLogos.map((holding, index) => (
            <div 
              key={holding.id} 
              className={`holding-item ${selectedCompanies.includes(holding.name) ? 'active' : ''}`}
              style={{ animationDelay: `${2.5 + index * 0.2}s` }}
              onClick={() => handleHoldingClick(holding.name)}
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
              {selectedCompanies.includes(holding.name) && (
                <div className="holding-active-indicator"></div>
              )}
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

      {/* Vertical Zoom Controls - Desktop Only */}
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
          {/* Filter Summary */}
          {getActiveFilterCount() > 0 && (
            <div className="filter-summary">
              <span>Showing {filteredProjects.length} projects</span>
              {selectedCategories.length > 0 && (
                <span className="filter-tags">
                  {selectedCategories.map(cat => (
                    <span key={cat} className="filter-tag category-tag">
                      {cat}
                      <button onClick={() => handleCategoryToggle(cat)}>×</button>
                    </span>
                  ))}
                </span>
              )}
              {selectedCompanies.length > 0 && (
                <span className="filter-tags">
                  {selectedCompanies.map(comp => (
                    <span key={comp} className="filter-tag company-tag">
                      {comp}
                      <button onClick={() => handleCompanyToggle(comp)}>×</button>
                    </span>
                  ))}
                </span>
              )}
            </div>
          )}
          
          <div 
            className="portfolio-masonry"
            data-columns={gridColumns}
          >
            {filteredProjects.map((project, index) => (
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
                  {project.category && (
                    <span className="project-tag">{project.category}</span>
                  )}
                  {project.company && (
                    <span className="project-tag company">{project.company}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && getActiveFilterCount() > 0 && (
            <div className="no-results">
              <h3>No projects found</h3>
              <p>Try adjusting your filters or <button onClick={clearAllFilters} className="clear-link">clear all filters</button></p>
            </div>
          )}
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
              {selectedProject.category && (
                <span className="modal-tag">{selectedProject.category}</span>
              )}
              {selectedProject.company && (
                <span className="modal-tag company">{selectedProject.company}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App