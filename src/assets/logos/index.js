
// Holdings logos - add your actual logo files here
// Example: import holding1Logo from './holding1.png'
import logohgroup from './logoprincipalh-negro.png'
import herologo from './herologo-negro.png'
// import holding3Logo from './holding3.png'
// import holding4Logo from './holding4.png'
// import holding5Logo from './holding5.png'

// Export individual logos
export {
  logohgroup,
  herologo
}

// Export holdings as an array for easy mapping
export const holdingsLogos = [
  {
    id: 'hero',
    name: 'HERO',
    logo: herologo,
    alt: 'HERO'
  },
  {
    id: 'holding2',
    name: 'Holding 2',
    logo: herologo,
    alt: 'Holding Company 2'
  },
  {
    id: 'holding3',
    name: 'Holding 3',
    logo: herologo,
    alt: 'Holding Company 3'
  },
  {
    id: 'holding4',
    name: 'Holding 4',
    logo: herologo,
    alt: 'Holding Company 4'
  },
  {
    id: 'holding5',
    name: 'Holding 5',
    logo: herologo,
    alt: 'Holding Company 5'
  }
]

// Export all logos as default
export default {
  holdings: {
    herologo
  },
  holdingsLogos,
  company: {
   logohgroup,
   herologo
  }
}