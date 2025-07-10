// src/assets/images/index.js

// Import all project images
import bulgariHype from './bulgari-hype.jpg'
import eventiHome from './evento-home.png'
import heroparty from './heroparty.jpg'
import lambintoHype from './lamboatrio-hype.jpg'
import maseratiHype from './maseratti-hype.jpg'
import omodaHome from './omoda-home.jpg'

// Import all project videos
import donjulioHalo from './donjulio-halo.mp4'
import funoHero from './funo-hero.mp4'
import honorHalo from './honor-halo.mp4'
import urusHype from './urus-hype.mp4'

// Export individual images
export {
  bulgariHype,
  eventiHome,
  heroparty,
  lambintoHype,
  maseratiHype,
  omodaHome
}

// Export individual videos
export {
  donjulioHalo,
  funoHero,
  honorHalo,
  urusHype
}

// Export portfolio projects as an array with your actual content
export const portfolioImages = [
  {
    id: 'bulgari',
    name: 'BULGARI',
    image: bulgariHype,
    alt: 'Bulgari Hype Campaign',
    category: 'Luxury',
    type: 'image'
  },
  {
    id: 'eventi',
    name: 'EVENTI',
    image: eventiHome,
    alt: 'Eventi Home Project',
    category: 'Events',
    type: 'image'
  },
  {
    id: 'heroparty',
    name: 'HERO PARTY',
    image: heroparty,
    alt: 'Hero Party Event',
    category: 'Events',
    type: 'image'
  },
  {
    id: 'lambinto',
    name: 'LAMBINTO',
    image: lambintoHype,
    alt: 'Lambinto Hype Campaign',
    category: 'Fashion',
    type: 'image'
  },
  {
    id: 'maserati',
    name: 'MASERATI',
    image: maseratiHype,
    alt: 'Maserati Hype Campaign',
    category: 'Automotive',
    type: 'image'
  },
  {
    id: 'omoda',
    name: 'OMODA',
    image: omodaHome,
    alt: 'Omoda Home Project',
    category: 'Automotive',
    type: 'image'
  }
]

// Export portfolio videos as an array
export const portfolioVideos = [
  {
    id: 'donjulio',
    name: 'DON JULIO',
    video: donjulioHalo,
    alt: 'Don Julio Halo Campaign',
    category: 'Spirits',
    type: 'video'
  },
  {
    id: 'funo',
    name: 'FUNO HERO',
    video: funoHero,
    alt: 'Funo Hero Campaign',
    category: 'Digital',
    type: 'video'
  },
  {
    id: 'honor',
    name: 'HONOR',
    video: honorHalo,
    alt: 'Honor Halo Campaign',
    category: 'Technology',
    type: 'video'
  },
  {
    id: 'urus',
    name: 'URUS',
    video: urusHype,
    alt: 'Urus Hype Campaign',
    category: 'Automotive',
    type: 'video'
  }
]

// Combine all portfolio items (images + videos)
export const allPortfolioItems = [
  ...portfolioImages,
  ...portfolioVideos
]

// Export all as default
export default {
  images: {
    bulgariHype,
    eventiHome,
    heroparty,
    lambintoHype,
    maseratiHype,
    omodaHome
  },
  videos: {
    donjulioHalo,
    funoHero,
    honorHalo,
    urusHype
  },
  portfolioImages,
  portfolioVideos,
  allPortfolioItems
}