const modal = document.getElementById("modal");
const closeModalBtn = document.querySelector(".close");
const modalTitle = document.getElementById("modal-title");
const modalYear = document.getElementById("modal-year");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
export function openModal(event) {
    modalTitle.textContent = event.title;
    modalYear.textContent = event.year;
    modalImage.src = event.imageURL;
    modalDescription.textContent = event.description;
    modal.style.display = "flex";
}
export function initModal() {
    closeModalBtn.addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}
