const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const accessScreen = document.querySelector("[data-portal-access]");
const portalApp = document.querySelector("[data-portal-app]");
const loginForm = document.querySelector("[data-portal-login]");
const sessionUser = document.querySelector("[data-session-user]");

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }

  const formData = new FormData(loginForm);
  const user = formData.get("user");

  if (sessionUser) {
    sessionUser.textContent = `${user} · Administrador`;
  }

  if (accessScreen) {
    accessScreen.hidden = true;
  }
  portalApp?.classList.remove("is-locked");
  window.scrollTo({ top: 0, behavior: "auto" });
});

document.querySelectorAll("[data-logout]").forEach((button) => {
  button.addEventListener("click", () => {
    portalApp?.classList.add("is-locked");
    if (accessScreen) {
      accessScreen.hidden = false;
    }
    loginForm?.reset();
    window.scrollTo({ top: 0, behavior: "auto" });
  });
});

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.openModal;
    modalTitle.textContent = type === "incident" ? "Nueva incidencia" : "Generar reporte";
    modal?.showModal();
  });
});
