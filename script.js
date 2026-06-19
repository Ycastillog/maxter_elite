const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-submitted");

    if (!form.checkValidity()) {
      return;
    }

    const data = new FormData(form);
    const details = Array.from(data.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key}: ${value}`)
      .join("%0D%0A");

    window.location.href = `mailto:contacto@maxterelite.com?subject=Solicitud%20Maxter%20Elite&body=${details}`;
  });
});
