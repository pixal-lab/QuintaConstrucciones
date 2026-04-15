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
import proy1a from './assets/projects/proy1-a.jpeg';
import proy1b from './assets/projects/proy1-b.jpeg';
import proy2a from './assets/projects/proy2-a.jpeg';
import proy2b from './assets/projects/proy2-b.jpeg';
import proy3a from './assets/projects/proy3-a.jpeg';
import proy3b from './assets/projects/proy3-b.jpeg';
import proy4a from './assets/projects/proy4-a.jpeg';
import proy4b from './assets/projects/proy4-b.jpeg';
import proy5a from './assets/projects/proy5-a.jpg';
import proy5b from './assets/projects/proy5-b.jpg';
import proy6 from './assets/projects/proy6.jpeg';
import proy7 from './assets/projects/proy7.jpeg';

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
    title: 'Ampliaciones de Casas en Santiago',
    description: 'Realizamos ampliaciones de casas en Santiago, desde habitaciones hasta segundos pisos completos. Trabajo estructural seguro, terminaciones de calidad y proyectos llave en mano.',
    cta: 'Amplía tu hogar con una empresa confiable.',
    icon: 'expansion'
  },
  {
    title: 'Instalación de Piso Flotante y SPC',
    description: 'Servicio de instalación de piso flotante y vinílico SPC en Santiago, con nivelación y terminaciones profesionales. Ideal para renovar tu hogar de forma rápida y duradera.',
    cta: 'Cotiza con especialistas en pisos.',
    icon: 'flooring'
  },
  {
    title: 'Remodelación de Baños en Santiago',
    description: 'Especialistas en remodelación de baños en Santiago. Cambio de tina a ducha, cerámicas, shower door y terminaciones modernas.',
    cta: 'Transforma tu baño con resultados profesionales.',
    icon: 'bathroom'
  },
  {
    title: 'Remodelación de Cocinas en Santiago',
    description: 'Ofrecemos remodelación de cocinas en Santiago, optimizando espacios con diseño moderno y funcional. Muebles, revestimientos y terminaciones de calidad.',
    cta: 'Renueva tu cocina con expertos.',
    icon: 'kitchen'
  },
  {
    title: 'Trabajos Eléctricos Certificados SEC',
    description: 'Realizamos trabajos eléctricos certificados en Santiago, con personal autorizado SEC. Instalaciones, mantención y diagnóstico de fallas.',
    cta: 'Seguridad y respaldo profesional garantizado.',
    icon: 'electrical'
  }
];

const projectsData = [
  {
    title: 'Proyecto Talagante',
    category: 'Baño',
    description: 'Fabricación integral de baño.',
    imageBefore: proy1a,
    imageAfter: proy1b
  },
  {
    title: 'Proyecto Recoleta',
    category: 'Baño',
    description: 'Remodelación completa de baño con shower door de corredera.',
    imageBefore: proy2a,
    imageAfter: proy2b
  },
  {
    title: 'Proyecto Ángel Cruchaga',
    category: 'Baño',
    description: 'Remodelación completa de baño en un espacio adaptado desde 0.',
    imageBefore: proy3a,
    imageAfter: proy3b
  },
  {
    title: 'Proyecto La Florida',
    category: 'Baño',
    description: 'Remodelación de ducha con receptáculo de fibra de vidrio e instalación de shower door de corredera.',
    imageBefore: proy4a,
    imageAfter: proy4b
  },
  {
    title: 'Proyecto La Reina',
    category: 'Cocina',
    description: 'Remodelación integral de cocina con muebles a medida.',
    imageBefore: proy5a,
    imageAfter: proy5b
  },
  {
    title: 'Proyecto Peñailillo',
    category: 'Cocina',
    description: 'Remodelación integral de cocina.',
    image: proy6
  },
  {
    title: 'Proyecto Los Fresnos',
    category: 'Baño',
    description: 'Remodelación de ducha con fabricación de receptáculo en obra e instalación de shower door de corredera con vidrio empavonado.',
    image: proy7
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
