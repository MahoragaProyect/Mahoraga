// Sistema de Temas - Light/Dark Mode

const themeManager = {
  // Colores para cada tema
  themes: {
    dark: {
      // Fondos
      '--bg-primary': '#0f0f0f',
      '--bg-secondary': '#1a1a1a',
      '--bg-tertiary': '#141414',
      
      // Textos
      '--text-primary': '#ffffff',
      '--text-secondary': '#c0c0c0',
      '--text-tertiary': '#808080',
      
      // Acentos
      '--accent-primary': '#2ecc71',
      '--accent-secondary': '#1e5fa8',
      '--accent-tertiary': '#18a058',
      
      // Bordes y sombras
      '--border-color': 'rgba(255, 255, 255, 0.1)',
      '--shadow-color': 'rgba(0, 0, 0, 0.6)',
      '--overlay-bg': 'rgba(0, 0, 0, 0.8)',
      '--icon-color': '#ffffff',
      '--node-locked': '#2a2a2a',
      '--node-available': '#1e5fa8',
      '--node-completed': '#2ecc71',
    },
    light: {
      // Fondos
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8f9fa',
      '--bg-tertiary': '#f0f0f0',
      
      // Textos
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#4a4a4a',
      '--text-tertiary': '#808080',
      
      // Acentos (menos brillosos)
      '--accent-primary': '#27ae60',
      '--accent-secondary': '#2980b9',
      '--accent-tertiary': '#229954',
      
      // Bordes y sombras
      '--border-color': 'rgba(0, 0, 0, 0.15)',
      '--shadow-color': 'rgba(0, 0, 0, 0.15)',
      '--overlay-bg': 'rgba(0, 0, 0, 0.5)',
      '--icon-color': '#1a1a1a',
      '--node-locked': '#dcdcdc',
      '--node-available': '#3498db',
      '--node-completed': '#27ae60',
    }
  },

  // Inicializar el tema manager
  init() {
    const savedTheme = localStorage.getItem('mahoraga-theme') || 'dark';
    this.setTheme(savedTheme);
    this.setupEventListeners();
  },

  // Establecer el tema
  setTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) return;

    // Aplicar variables CSS
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    // Cambiar colores de iconos lord-icon
    const iconColor = theme['--icon-color'];
    document.querySelectorAll('lord-icon').forEach(icon => {
      icon.setAttribute('colors', `primary:${iconColor}`);
    });

    // Guardar preferencia
    localStorage.setItem('mahoraga-theme', themeName);

    // Actualizar botones de tema
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-theme="${themeName}"]`)?.classList.add('active');

    // Cambiar clase en body para otros estilos
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${themeName}-mode`);
  },

  // Setup de event listeners
  setupEventListeners() {
    // Botones de tema
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        this.setTheme(theme);
      });
    });

    // Botón de settings
    const settingsBtn = document.querySelector('.sidebar-settings');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const settingsClose = document.querySelector('.settings-close');

    if (settingsBtn && settingsOverlay) {
      settingsBtn.addEventListener('click', () => {
        settingsOverlay.classList.add('active');
      });
    }

    if (settingsClose && settingsOverlay) {
      settingsClose.addEventListener('click', () => {
        settingsOverlay.classList.remove('active');
      });
    }

    // Cerrar al hacer click fuera
    if (settingsOverlay) {
      settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) {
          settingsOverlay.classList.remove('active');
        }
      });
    }

    // Botón de logout
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Limpiar datos locales
        localStorage.removeItem('mahoraga-theme');
        localStorage.removeItem('mahoraga-user');
        // Redirigir al landing page
        window.location.href = '../../index.html';
      });
    }
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  themeManager.init();
});
