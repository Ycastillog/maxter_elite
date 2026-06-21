const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const floatingWhatsApp = document.querySelector(".floating-whatsapp");
const resourcesSection = document.querySelector("#recursos");
const systemSection = document.querySelector("#sistema");
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const fieldLabels = {
  name: "Nombre",
  phone: "Teléfono",
  property: "Tipo de condominio o propiedad",
  email: "Correo",
  message: "Mensaje",
};

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  if (floatingWhatsApp) {
    const nearFooter = window.innerHeight + window.scrollY > document.body.scrollHeight - 260;
    const pastResources = resourcesSection ? window.scrollY > resourcesSection.offsetTop - 420 : false;
    const overSystem =
      systemSection &&
      systemSection.getBoundingClientRect().top < window.innerHeight - 120 &&
      systemSection.getBoundingClientRect().bottom > 160;
    floatingWhatsApp.classList.toggle("is-hidden", nearFooter || pastResources || overSystem);
  }
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menu");
  });
});

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const setActiveLink = () => {
  let current = null;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 280) {
      current = section;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", current && link.getAttribute("href") === `#${current.id}`);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });

const scrollToHash = () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView({ behavior: "auto", block: "start" });
  setHeaderState();
  setActiveLink();
};

window.addEventListener("load", () => {
  window.setTimeout(scrollToHash, 120);
  window.setTimeout(scrollToHash, 600);
  window.setTimeout(scrollToHash, 1200);
});
window.addEventListener("hashchange", () => {
  window.setTimeout(scrollToHash, 40);
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const details = Array.from(data.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${fieldLabels[key] ?? key}: ${String(value).trim()}`)
      .join("\n");

    let status = form.querySelector(".form-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "form-status";
      status.setAttribute("role", "status");
      form.append(status);
    }
    status.textContent = "Abriendo su correo para completar la solicitud.";

    const params = new URLSearchParams({
      subject: "Solicitud Maxter Elite",
      body: details,
    });
    window.location.href = `mailto:contacto@maxterelite.com?${params.toString()}`;
  });
});
