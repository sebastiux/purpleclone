import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      workWithUs: 'WORK WITH US',
      joinUs: 'JOIN US',
      followUs: 'FOLLOW US',
      hundredVoices: '100 VOCES',
      viewWorkBy: 'VIEW WORK BY',
      allWork: 'All Work',
      filtersActive: 'Filters Active',
      clearAll: 'Clear All',
      byH: 'By H',
      byCompany: 'By Company',
      noResults: 'No projects found',
      tryAdjusting: 'Try adjusting your filters or',
      clearFilters: 'clear all filters'
    },
    presentation: {
      title: 'LUXURY BRANDING',
      tagline: 'Conectamos lo imposible'
    },
    workWithUs: {
      text1: 'HGROUP understands the world of luxury, offering connected services across Press, Communications, Social Media, Events, VIP, Creative Strategy, Brand Strategy and Talent Partnerships. Culturally fluent and hyper-connected, we partner with our clients to create maximum impact.',
      text2: 'Bringing together 25 years of strategic brand building experience with next generation in-house talent, we deliver creative thinking and game-changing ideas to drive commercial success.',
      text3: 'Our clients span multiple divisions including Art, Design & Culture, Beauty & Wellbeing, Fashion & Jewellery, Restaurants & Bars, Property & Placemaking, Events, Charity and Sustainability.',
      text4: 'Our commitment to sustainability is a core agency value and we continue to introduce business practices to reduce our clients\' impact.',
      contact: 'CONTACT',
      ourHs: 'OUR H\'S',
      viewMore: 'VIEW MORE'
    },
    joinUs: {
      text1: 'We are a team of creators and innovators. We know there is more than one way to get things done, and we cultivate a range of diverse perspectives. HGROUP is always growing and seeking new talent to join our global community.',
      text2: 'Please click here to see our current vacancies, or for any general enquiries, please email careers@hgroup.com',
      allLocations: 'ALL LOCATIONS',
      london: 'LONDON',
      applyLinkedin: 'APPLY ON LINKEDIN'
    },
    expertise: [
      { name: 'HERO', description: 'Passionate creativity that connects emotionally' },
      { name: 'HALO', description: 'Strategic thinking that drives results' },
      { name: 'HERE', description: 'Flawless execution that delivers excellence' },
      { name: 'HITS', description: 'Bold ideas that stand out' },
      { name: 'HOME', description: 'Connected ecosystem of talent and resources' },
      { name: 'HUGE', description: 'Authentic experiences that resonate' },
      { name: 'HUNT', description: 'Positive impact that elevates brands' },
      { name: 'HYPE', description: 'Constant innovation that inspires' }
    ]
  },
  es: {
    nav: {
      workWithUs: 'TRABAJA CON NOSOTROS',
      joinUs: 'ÚNETE',
      hundredVoices: '100 VOCES',
      followUs: 'SÍGUENOS',
      viewWorkBy: 'VER TRABAJO POR',
      allWork: 'Todo el trabajo',
      filtersActive: 'Filtros activos',
      clearAll: 'Limpiar todo',
      byH: 'Por H',
      byCompany: 'Por Empresa',
      noResults: 'No se encontraron proyectos',
      tryAdjusting: 'Intenta ajustar tus filtros o',
      clearFilters: 'limpiar todos los filtros'
    },
    presentation: {
      title: 'BRANDING DE LUJO',
      tagline: 'Conectamos lo imposible'
    },
    workWithUs: {
      text1: 'HGROUP entiende el mundo del lujo, ofreciendo servicios conectados en Prensa, Comunicaciones, Redes Sociales, Eventos, VIP, Estrategia Creativa, Estrategia de Marca y Asociaciones de Talento. Culturalmente fluidos e hiperconectados, nos asociamos con nuestros clientes para crear el máximo impacto.',
      text2: 'Reuniendo 25 años de experiencia en construcción estratégica de marca con talento interno de próxima generación, entregamos pensamiento creativo e ideas revolucionarias para impulsar el éxito comercial.',
      text3: 'Nuestros clientes abarcan múltiples divisiones incluyendo Arte, Diseño y Cultura, Belleza y Bienestar, Moda y Joyería, Restaurantes y Bares, Propiedad y Placemaking, Eventos, Caridad y Sostenibilidad.',
      text4: 'Nuestro compromiso con la sostenibilidad es un valor fundamental de la agencia y continuamos introduciendo prácticas comerciales para reducir el impacto de nuestros clientes.',
      contact: 'CONTACTO',
      ourHs: 'NUESTRAS H\'S',
      viewMore: 'VER MÁS'
    },
    joinUs: {
      text1: 'Somos un equipo de creadores e innovadores. Sabemos que hay más de una forma de hacer las cosas, y cultivamos una variedad de perspectivas diversas. HGROUP siempre está creciendo y buscando nuevos talentos para unirse a nuestra comunidad global.',
      text2: 'Por favor haz clic aquí para ver nuestras vacantes actuales, o para cualquier consulta general, envía un correo a careers@hgroup.com',
      allLocations: 'TODAS LAS UBICACIONES',
      london: 'CDMX',
      applyLinkedin: 'APLICAR EN LINKEDIN'
    },
    expertise: [
      { name: 'HERO', description: 'Creatividad apasionada que conecta emocionalmente' },
      { name: 'HALO', description: 'Pensamiento estratégico que impulsa resultados' },
      { name: 'HERE', description: 'Ejecución impecable que entrega excelencia' },
      { name: 'HITS', description: 'Ideas audaces que destacan' },
      { name: 'HOME', description: 'Ecosistema conectado de talento y recursos' },
      { name: 'HOPE', description: 'Experiencias auténticas que resuenan' },
      { name: 'HUGE', description: 'Impacto positivo que eleva las marcas' },
      { name: 'HUNT', description: 'Conexiones auténticas que generan confianza' },
      { name: 'HYPE', description: 'Innovación constante que inspira' }
    ]
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};