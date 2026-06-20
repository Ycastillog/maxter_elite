const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.openModal;
    modalTitle.textContent = type === "incident" ? "Nueva incidencia" : "Generar reporte";
    modal?.showModal();
  });
});
