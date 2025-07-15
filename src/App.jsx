import { useState, useEffect, useRef, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { logohgroup, holdingsLogos } from './assets/logos'
import { images } from './assets'
import WorkWithUs from './components/WorkWithUs'
import JoinUs from './components/JoinUs'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import LanguageToggle from './components/LanguageToggle'
import gsap from 'gsap'
import './App.css'

function HomePage() {
  const [showMainHeader, setShowMainHeader] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [gridColumns, setGridColumns] = useState(3)
  const [showPresentation, setShowPresentation] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activePage, setActivePage] = useState('home')
  const [showHoldingsMenu, setShowHoldingsMenu] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()
  
  // Refs for GSAP
  const portfolioRef = useRef(null)
  const timelineRef = useRef(null)
  const containerRef = useRef(null)
  
  // Enhanced Filter states for combination
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])

  // Check if coming from another page
  // Updated presentation timer effect
useEffect(() => {
  const isFromSubpage = location.state?.fromSubpage
  const sessionVisited = sessionStorage.getItem('hasVisited')
  
  if (!isFromSubpage && !sessionVisited) {
    setIsInitialLoad(true)
    setShowPresentation(true)
    
    // Set session storage immediately to prevent re-shows on navigation
    sessionStorage.setItem('hasVisited', 'true')
    
    // Hide presentation after animations complete (4.3s total)
    const timer = setTimeout(() => {
      setShowPresentation(false)
      setIsInitialLoad(false)
    }, 4300)
    
    return () => clearTimeout(timer)
  } else {
    setIsInitialLoad(false)
    setShowPresentation(false)
  }
}, [location])

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
    const portfolioCompanies = images.allPortfolioItems.map(item => item.company).filter(comp => comp)
    const allCompanies = [...new Set(portfolioCompanies)]
    return allCompanies.sort()
  }

  // Filter projects based on selected categories and companies
  useEffect(() => {
    if (!images.allPortfolioItems) {
      setFilteredProjects([])
      return
    }

    let filtered = [...images.allPortfolioItems]
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => 
        selectedCategories.includes(item.category)
      )
    }
    
    if (selectedCompanies.length > 0) {
      filtered = filtered.filter(item => 
        selectedCompanies.includes(item.company)
      )
    }
    
    const shuffled = shuffleArray(filtered)
    setFilteredProjects(shuffled)
  }, [selectedCategories, selectedCompanies])

  // Initial shuffle on mount
  useEffect(() => {
    if (images.allPortfolioItems) {
      const shuffled = shuffleArray([...images.allPortfolioItems])
      setFilteredProjects(shuffled)
    }
  }, [])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Hide holdings menu on scroll
      if (window.scrollY > 100) {
        setShowHoldingsMenu(false)
      } else {
        setShowHoldingsMenu(true)
      }
    }
    
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

  // Updated presentation timer effect
  useEffect(() => {
  const isFromSubpage = location.state?.fromSubpage
  const sessionVisited = sessionStorage.getItem('hasVisited')
  
  // Only show presentation on fresh page load (no session storage and not from subpage)
  if (!isFromSubpage && !sessionVisited) {
    setIsInitialLoad(true)
    setShowPresentation(true)
    // Set session storage after showing presentation
    setTimeout(() => {
      sessionStorage.setItem('hasVisited', 'true')
    }, 3200)
  } else {
    setIsInitialLoad(false)
    setShowPresentation(false)
  }
}, [location])

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

  // Enhanced GSAP Animation for ultra-smooth, water-like grid transitions
  // Replace the existing GSAP useEffect with this improved version
useEffect(() => {
  if (!portfolioRef.current || !containerRef.current) return

  // Kill any existing timeline
  if (timelineRef.current) {
    timelineRef.current.kill()
  }

  const items = Array.from(portfolioRef.current.querySelectorAll('.portfolio-item'))
  
  if (items.length === 0) return

  // Set animation state
  setIsAnimating(true)

  // FLIP Technique - Step 1: Record initial positions (First)
  const initialStates = items.map(item => {
    const rect = item.getBoundingClientRect()
    return {
      element: item,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    }
  })

  // FLIP Technique - Step 2: Apply new layout (Last)
  portfolioRef.current.style.gridTemplateColumns = `repeat(${gridColumns}, 1fr)`
  
  // Force layout recalculation
  portfolioRef.current.offsetHeight

  // FLIP Technique - Step 3: Record final positions
  const finalStates = items.map(item => {
    const rect = item.getBoundingClientRect()
    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    }
  })

  // Create master timeline with optimized settings
  const masterTL = gsap.timeline({
    defaults: {
      duration: 0.1, // Reduced from 1.1
      ease: "power2.out" // More pronounced easing
    },
    onComplete: () => {
      setIsAnimating(false)
    }
  })

  // FLIP Technique - Step 4: Animate from initial to final (Invert & Play)
  items.forEach((item, i) => {
    const initial = initialStates[i]
    const final = finalStates[i]
    
    const deltaX = initial.x - final.x
    const deltaY = initial.y - final.y
    
    // Only animate items that actually moved significantly
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      // Calculate movement distance for dynamic duration
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const dynamicDuration = Math.min(1.0, Math.max(0.5, distance / 100)) // More responsive
      
      // Set initial position with more visible transform
      gsap.set(item, {
        x: deltaX,
        y: deltaY,
        scale: 0.97, // Slight scale for more visible effect
        rotation: 0,
        opacity: 0.8 // Slight opacity change for visibility
      })
      
      // Animate to final position with enhanced easing
      masterTL.to(item, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: dynamicDuration,
        ease: "back.out(1.2)", // More bouncy easing for visibility
        overwrite: true
      }, i * 0.3) // Reduced stagger for faster overall animation
      
    } else {
      // For items that don't move, ensure clean state with subtle animation
      gsap.set(item, {
        x: 0,
        y: 0,
        scale: 0.98,
        rotation: 0,
        opacity: 0.9
      })
      
      // Quick fade-in for non-moving items
      masterTL.to(item, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, i * 0.03)
    }
  })

  timelineRef.current = masterTL
}, [gridColumns])
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

  // Enhanced zoom handlers with animation state management
  // Simplified zoom handlers
const handleZoomOut = () => {
  if (isAnimating || gridColumns >= 7) return
  setIsAnimating(true)
  
  // Add transitioning class
  portfolioRef.current?.classList.add('transitioning')
  
  setTimeout(() => {
    setGridColumns(prev => Math.min(prev + 1, 7))
    setTimeout(() => {
      portfolioRef.current?.classList.remove('transitioning')
      setIsAnimating(false)
    }, 100)
  }, 100)
}

const handleZoomIn = () => {
  if (isAnimating || gridColumns <= 1) return
  setIsAnimating(true)
  
  // Add transitioning class
  portfolioRef.current?.classList.add('transitioning')
  
  setTimeout(() => {
    setGridColumns(prev => Math.max(prev - 1, 1))
    setTimeout(() => {
      portfolioRef.current?.classList.remove('transitioning')
      setIsAnimating(false)
    }, 100)
  }, 100)
}

  const openProject = (project) => {
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleCompanyToggle = (company) => {
    setSelectedCompanies(prev => {
      if (prev.includes(company)) {
        return prev.filter(comp => comp !== company)
      } else {
        return [...prev, company]
      }
    })
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedCompanies([])
    setShowFilterMenu(false)
  }

  const handleHoldingClick = (holdingId) => {
    // For now, just console log or show alert
    console.log(`Navigating to ${holdingId}`)
    alert(`This would navigate to ${holdingId} page`)
    // Later you can uncomment this:
    // navigate(`/holding/${holdingId}`)
  }

  const getFilterDisplayText = () => {
    const totalFilters = selectedCategories.length + selectedCompanies.length
    
    if (totalFilters === 0) return t('nav.allWork')
    if (totalFilters === 1) {
      if (selectedCategories.length === 1) return selectedCategories[0].toUpperCase()
      if (selectedCompanies.length === 1) return selectedCompanies[0].toUpperCase()
    }
    
    return `${totalFilters} ${t('nav.filtersActive')}`
  }

  const getActiveFilterCount = () => {
    return selectedCategories.length + selectedCompanies.length
  }

  const handleNavigation = (page, path) => {
    setActivePage(page)
    navigate(path)
  }

  return (
    <div className="App" ref={containerRef}>
      {/* Presentation Message with Logo - Only on initial load */}
      {showPresentation && isInitialLoad && (
        <div className="presentation-overlay">
          <div className="presentation-content">
            <h1 className="presentation-text">
              {t('presentation.title')}
            </h1>
            <img 
              src={logohgroup} 
              alt="HGROUP" 
              className="presentation-logo"
            />
            <p className="presentation-tagline">{t('presentation.tagline')}</p>
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
              onClick={() => {
                setActivePage('home')
                navigate('/', { state: { fromSubpage: false } })
              }}
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <a 
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation('work', '/work-with-us')
                  }}
                  className={`nav-link ${activePage === 'work' ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-text">{t('nav.workWithUs')}</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation('join', '/join-us')
                  }}
                  className={`nav-link ${activePage === 'join' ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="nav-text">{t('nav.joinUs')}</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="https://www.instagram.com/hgroupp_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  <span className="nav-text">{t('nav.followUs')}</span>
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
              {t('nav.viewWorkBy')} : {getFilterDisplayText()}
              {getActiveFilterCount() > 0 && (
                <span className="filter-count">{getActiveFilterCount()}</span>
              )}
              <span className={`arrow ${showFilterMenu ? 'up' : 'down'}`}>▼</span>
            </button>
            
            {showFilterMenu && (
              <div className="filter-dropdown">
                <div className="filter-dropdown-content">
                  {/* Mobile close button */}
                  <button 
                    className="filter-close-mobile"
                    onClick={() => setShowFilterMenu(false)}
                    aria-label="Close filters"
                  >
                    ×
                  </button>
                  
                  {/* Clear All Button */}
                  {getActiveFilterCount() > 0 && (
                    <div className="filter-actions">
                      <button 
                        onClick={clearAllFilters}
                        className="clear-all-btn"
                      >
                        {t('nav.clearAll')} ({getActiveFilterCount()})
                      </button>
                    </div>
                  )}
                  
                  {/* Categories Section */}
                  {getUniqueCategories().length > 0 && (
                    <div className="filter-section">
                      <h4>{t('nav.byH')}</h4>
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
                    <h4>{t('nav.byCompany')}</h4>
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
      <section className={`holdings-menu ${!showMainHeader ? 'fixed' : ''} ${!showHoldingsMenu ? 'hidden' : ''}`}>
        <div className="holdings-container">
          {holdingsLogos.map((holding, index) => (
            <div
              key={holding.id} 
              className="holding-item"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              onClick={() => handleHoldingClick(holding.id)}
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
            onClick={() => {
              setActivePage('home')
              navigate('/', { state: { fromSubpage: false } })
            }}
            style={{ cursor: 'pointer' }}
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
            <li>
              <a 
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('work', '/work-with-us')
                  setMobileMenuOpen(false)
                }}
                className={activePage === 'work' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.workWithUs')}
              </a>
            </li>
            <li>
              <a 
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('join', '/join-us')
                  setMobileMenuOpen(false)
                }}
                className={activePage === 'join' ? 'active' : ''}
                style={{ cursor: 'pointer' }}
              >
                {t('nav.joinUs')}
              </a>
            </li>
            <li>
              <a 
                href="https://www.instagram.com/hgroupp_/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.followUs')} <span className="nav-arrow-small">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Vertical Zoom Controls - Desktop Only */}
      <div className="zoom-controls">
        <button 
          className={`zoom-btn zoom-plus ${isAnimating ? 'animating' : ''}`}
          onClick={handleZoomIn}
          disabled={gridColumns === 1 || isAnimating}
        >
          +
        </button>
        <div className="zoom-divider"></div>
        <button 
          className={`zoom-btn zoom-minus ${isAnimating ? 'animating' : ''}`}
          onClick={handleZoomOut}
          disabled={gridColumns === 7 || isAnimating}
        >
          −
        </button>
      </div>

      {/* Portfolio Grid */}
      <main className="main-content">
        <section className="portfolio-section">
          <div 
            ref={portfolioRef}
            className="portfolio-masonry"
            style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
          >
            {filteredProjects.map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
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
              <h3>{t('nav.noResults')}</h3>
              <p>{t('nav.tryAdjusting')} <button onClick={clearAllFilters} className="clear-link">{t('nav.clearFilters')}</button></p>
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

      {/* Language Toggle */}
      <LanguageToggle />
    </div>
  )
}

function App() {
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <LanguageProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/join-us" element={<JoinUs />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App