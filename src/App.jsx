import './App.css'
import logoQC from './assets/logos/LogoQC-sin-fondo-letrasblancas.png'

function App() {
  return (
    <div className="app-container">
      <img
        src={logoQC}
        alt="Quinta Construcciones Logo"
        className="logo"
      />

      <h1 className="title">En Construcción</h1>
      <p className="subtitle">
        Estamos preparando algo increíble para ti. Nuestro nuevo sitio web de Quinta Construcciones
        estará disponible muy pronto.
      </p>

      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>

      <div className="contact-info">
        <p>CONSTRUCCIÓN Y REMODELACIÓN</p>
      </div>
    </div>
  )
}

export default App
