const translations = {
  es: {
    "nav.about": "Sobre_mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "cv.aria": "Descargar CV",
    "hero.boot": "SYSTEM_INITIALIZED",
    "hero.role": "DevOPS &amp; Automation Engineer",
    "hero.tagline": "Automatizo infraestructuras, acelero despliegues y elimino trabajo repetitivo.<br>Si se puede automatizar, se puede mejorar.",
    "title.default": "Adrián Ramos — DevOPS &amp; Automation Engineer",
    "title.away": "¿Ya te vas? 👀",
    "hero.cta.projects": "Ver proyectos",
    "hero.cta.cv": "[ Descargar_CV ]",
    "about.desc": `<p>Soy un ingeniero de DevOps especializado en automatización de despliegues y operaciones. Mi herramienta principal de Infraestructura como Código es <strong>Puppet</strong>, con la que gestiono y estandarizo la configuración de servidores y el ciclo de vida completo del software en producción.</p>
          <p>Actualmente trabajo en <a href="https://www.domingoalonsogroup.com/" target="_blank" rel="noopener noreferrer" class="inline-link">Domingo Alonso Group</a>, donde utilizo <strong>Rundeck</strong> como plataforma de orquestación para automatizar tareas recurrentes, reducir tiempos operativos y dar autonomía a los equipos sin necesidad de acceso directo a los sistemas. El resultado: menos intervención manual, menos errores y despliegues más predecibles.</p>
          <p>Cuando no estoy escribiendo manifests de Puppet o configurando jobs en Rundeck, me gusta salir a rutear en moto, la lectura y cualquier cosa que no requiera YAML.</p>`,
    "skills.python": "Python / Bash",
    "skills.docker": "Docker / Contenedores",
    "skills.linux": "Linux / Administración",
    "exp.status.active": "● ACTIVO",
    "exp.date.present": "2024 — Presente",
    "exp.desc.devops": "Automatización de despliegues de software mediante <strong>Puppet</strong> como herramienta de Infraestructura como Código, gestionando la configuración y el ciclo de vida de los servidores en entornos de producción. Diseño e implementación de flujos de trabajo en <strong>Rundeck</strong> para reducir la intervención manual en tareas recurrentes, mejorar los tiempos operativos y dar autonomía a los equipos sin necesidad de acceso directo a los sistemas.",
    "exp.status.completed": "✓ COMPLETADO",
    "exp.desc.servicedesk": "Soporte técnico crítico (Nivel 1/2) e infraestructura física y cloud en entornos de alta demanda. Administración de identidades con <strong>Google Workspace</strong>, gestión de escritorios virtuales en <strong>Citrix Workspace</strong> y protección endpoint con <strong>Bitdefender</strong>. Liderazgo técnico en proyectos de expansión para nuevos centros, coordinando el despliegue de CPDs, redes cloud <strong>Extreme Networks</strong> y telefonía <strong>AVAYA</strong>, asegurando una resolución eficiente de incidencias bajo metodologías ágiles a través de <strong>JIRA</strong>.",
    "exp.cta.cv": "Ver CV completo",
    "projects.working": "Working on it",
    "footer.desc": "Diseñado y desarrollado con 🔥 usando HTML, CSS &amp; JavaScript."
  },
  en: {
    "nav.about": "About_me",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "cv.aria": "Download CV",
    "hero.boot": "SYSTEM_INITIALIZED",
    "hero.role": "DevOPS &amp; Automation Engineer",
    "hero.tagline": "I automate infrastructures, accelerate deployments, and eliminate repetitive tasks.<br>If it can be automated, it can be improved.",
    "title.default": "Adrián Ramos — DevOPS &amp; Automation Engineer",
    "title.away": "Leaving so soon? 👀",
    "hero.cta.projects": "View projects",
    "hero.cta.cv": "[ Download_CV ]",
    "about.desc": `<p>I am a DevOps engineer specialized in deployment automation and operations. My primary Infrastructure as Code tool is <strong>Puppet</strong>, which I use to manage and standardize server configurations and the complete software lifecycle in production.</p>
          <p>I currently work at <a href="https://www.domingoalonsogroup.com/" target="_blank" rel="noopener noreferrer" class="inline-link">Domingo Alonso Group</a>, where I use <strong>Rundeck</strong> as an orchestration platform to automate recurring tasks, reduce operational times, and provide autonomy to teams without requiring direct system access. The result: less manual intervention, fewer errors, and more predictable deployments.</p>
          <p>When I'm not writing Puppet manifests or configuring Rundeck jobs, I enjoy motorcycle riding, reading, and doing anything that doesn't require YAML.</p>`,
    "skills.python": "Python / Bash",
    "skills.docker": "Docker / Containers",
    "skills.linux": "Linux / Administration",
    "exp.status.active": "● ACTIVE",
    "exp.date.present": "2024 — Present",
    "exp.desc.devops": "Software deployment automation using <strong>Puppet</strong> as an Infrastructure as Code tool, managing configurations and the server lifecycle in production environments. Designed and implemented workflows in <strong>Rundeck</strong> to reduce manual intervention in recurring tasks, improve operational times, and grant autonomy to teams without direct system access.",
    "exp.status.completed": "✓ COMPLETED",
    "exp.desc.servicedesk": "Critical technical support (L1/L2) and physical/cloud infrastructure management in high-demand environments. Identity administration with <strong>Google Workspace</strong>, virtual desktop management in <strong>Citrix Workspace</strong>, and endpoint protection with <strong>Bitdefender</strong>. Technical leadership in expansion projects for new centers, coordinating the deployment of datacenters, <strong>Extreme Networks</strong> cloud networks, and <strong>AVAYA</strong> telephony, ensuring efficient incident resolution under agile methodologies via <strong>JIRA</strong>.",
    "exp.cta.cv": "View full CV",
    "projects.working": "Working on it",
    "footer.desc": "Designed and built with 🔥 using HTML, CSS &amp; JavaScript."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  if (!langToggle) return;

  // Detect saved language or use default 'es'
  let currentLang = localStorage.getItem("preferredLanguage") || "es";
  langToggle.value = currentLang;

  const updateLanguage = (lang) => {
    document.documentElement.lang = lang;

    // Update texts
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update aria labels
    document.querySelectorAll("[data-i18n-aria]").forEach(el => {
      const key = el.getAttribute("data-i18n-aria");
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute("aria-label", translations[lang][key]);
      }
    });

    // Save preference
    localStorage.setItem("preferredLanguage", lang);
  };

  // Initial update
  updateLanguage(currentLang);

  // Event listener
  langToggle.addEventListener("change", (e) => {
    updateLanguage(e.target.value);
  });

  // --- Visibility Tracker (Away Status) ---
  const initialTitle = document.title;
  const faviconLink = document.querySelector("link[rel~='icon']");

  const greenFavicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='6' fill='%2300f576'/%3E%3C/svg%3E";
  const yellowFavicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='6' fill='%23ffaa1a'/%3E%3C/svg%3E";

  document.addEventListener("visibilitychange", () => {
    const lang = localStorage.getItem("preferredLanguage") || "es";
    if (document.hidden) {
      document.title = (translations[lang] && translations[lang]["title.away"]) || "¿Ya te vas? 👀";
      if (faviconLink) faviconLink.href = yellowFavicon;
    } else {
      document.title = (translations[lang] && translations[lang]["title.default"]) || initialTitle;
      if (faviconLink) faviconLink.href = greenFavicon;
    }
  });
});
