import React from 'react';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsSection from './components/sections/ProjectsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ContactSection from './components/sections/ContactSection';
import WhatsAppButton from './components/specific/WhatsAppButton';
import logoQC from './assets/logos/LogoQC-sin-fondo-letrasblancas.png';
import hero from './assets/hero.webp';
import proj1 from './assets/projects/84879aa4-deac-4c5d-9331-538b5f321aab.jpeg';
import proj2 from './assets/projects/90896ba6-6b32-4107-bc70-26f2b1077e13.jpeg';
import proj3 from './assets/projects/IMG_1876.jpeg';
import proj4 from './assets/projects/IMG_2759.jpeg';
import proj5 from './assets/projects/c2b43701-c2f4-41ca-9477-04654963d330.jpeg';
import proj6 from './assets/projects/photo-output.jpeg';

// Dummy Data
const navbarSections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'services', label: 'Servicios' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'testimonials', label: 'Testimonios' },
  // { id: 'contact', label: 'Contacto' }
];

const servicesData = [
  {
    title: 'Remodelaciones',
    description: 'Transformamos tus espacios actuales en lugares modernos y funcionales, adaptados a tus nuevas necesidades.',
    icon: 'remodelation'
  },
  {
    title: 'Construcción',
    description: 'Construcción de obra nueva desde los cimientos hasta las terminaciones finales, llave en mano.',
    icon: 'construction'
  },
  {
    title: 'Pintura',
    description: 'Servicio profesional de pintura interior y exterior para darle nueva vida a tu entorno.',
    icon: 'painting'
  },
  {
    title: 'Instalaciones Sanitarias',
    description: 'Todo tipo de trabajos de gasfitería, reparaciones e instalación de artefactos con máxima seguridad.',
    icon: 'plumbing'
  }
];

const projectsData = [
  {
    title: 'Remodelación de Baño',
    category: 'Remodelación',
    description: 'Renovación completa de baño, incluyendo cambio de revestimientos, artefactos y optimización del espacio.',
    image: proj1
  },
  {
    title: 'Remodelación de Cocina',
    category: 'Remodelación',
    description: 'Modernización de cocina con nuevo mobiliario, cubiertas de cuarzo y sistema de iluminación eficiente.',
    image: proj2
  },
  {
    title: 'Reparación de Baño',
    category: 'Reparación',
    description: 'Reparación de muros, mejoras en terminaciones y aplicación de pintura resistente a la humedad.',
    image: proj3
  },
  {
    title: 'Construcción de Baño',
    category: 'Construcción',
    description: 'Construcción completa de baño desde obra gruesa hasta terminaciones, con distribución funcional.',
    image: proj4
  },
  {
    title: 'Remodelación de Baño Principal',
    category: 'Remodelación',
    description: 'Actualización de baño principal con instalación de porcelanato, shower door y grifería moderna.',
    image: proj5
  },
  {
    title: 'Terminaciones de Baño',
    category: 'Terminaciones',
    description: 'Mejoras en terminaciones interiores, incluyendo revestimientos, pintura antihumedad y detalles finales.',
    image: proj6
  }
];

const testimonialsData = [
  {
    name: 'Elias Quintanilla',
    role: 'Dueño de Negocio',
    content: 'Excelente servicio, muy responsables con los plazos de entrega y las terminaciones de mi cocina quedaron preciosas. 100% recomendados.'
  },
  {
    name: 'Iglesia La Reina',
    role: 'Administrador de Comunidad',
    content: 'La asesoría profesional que brindaron desde el comienzo ayuda mucho a tomar buenas decisiones en la obra.'
  },
  {
    name: 'Familia Aguilar',
    role: 'Clientes Residenciales',
    content: 'Transformaron completamente nuestro patio, construyendo el quincho que siempre soñamos. Destaco la limpieza y el orden durante los trabajos.'
  }
];

function App() {
  const wspPhoneNumber = "56986849412";
  const wspMessage = "Hola Quinta Construcciones, vengo desde el sitio web y me gustaría cotizar un trabajo.";
  const wspUrl = `https://wa.me/${wspPhoneNumber}?text=${encodeURIComponent(wspMessage)}`;

  return (
    <Layout navbarSections={navbarSections} logo={logoQC}>

      <HeroSection
        id="hero"
        title="Construimos tus ideas"
        subtitle="Especialistas en remodelación, construcción y mantención. Confiabilidad y excelencia en cada proyecto."
        ctaText="Solicitar Cotización"
        ctaLink={wspUrl}
        backgroundUrl={hero}
      />

      <ServicesSection
        id="services"
        title="Nuestros Servicios"
        subtitle="Ofrecemos soluciones integrales para cubrir todas tus necesidades de construcción y remodelación."
        services={servicesData}
      />

      <ProjectsSection
        id="projects"
        title="Proyectos Destacados"
        subtitle="Un vistazo a algunos de los trabajos que hemos realizado para nuestros clientes y la calidad que nos respalda."
        projects={projectsData}
      />

      <TestimonialsSection
        id="testimonials"
        title="Lo que dicen de nosotros"
        subtitle="La confianza de nuestros clientes es nuestro mejor respaldo y carta de presentación."
        testimonials={testimonialsData}
      />

      {/* <ContactSection
        id="contact"
        title="Contáctanos"
        subtitle="¿Tienes un proyecto en mente? Escríbenos y te enviaremos un presupuesto detallado a la brevedad."
        contactInfo={{
          phone: "+56 9 8684 9412",
          email: "proyectos@quintaconstrucciones.cl",
          address: "Región de Valparaíso, Chile"
        }}
      /> */}

      <WhatsAppButton
        phoneNumber={wspPhoneNumber}
        message={wspMessage}
      />

    </Layout>
  );
}

export default App;
