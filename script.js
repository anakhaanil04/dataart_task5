document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close");
    const modalTitle = document.getElementById("modal-title");
    const modalYear = document.getElementById("modal-year");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const themeToggle = document.getElementById("themeToggle");

    fetch("events.json")
        .then(response => response.json())
        .then(events => {
            events.forEach(event => {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("timeline-event");
                eventDiv.innerHTML = `
                    <div class="circle"></div>
                    <h3>${event.year}</h3>
                    <p>${event.title}</p>
                    <img src="${event.imageURL}" alt="${event.title}">
                `;
                eventDiv.addEventListener("click", () => {
                    modalTitle.textContent = event.title;
                    modalYear.textContent = event.year;
                    modalImage.src = event.imageURL;
                    modalDescription.textContent = event.description;
                    modal.style.display = "flex";
                });
                timeline.appendChild(eventDiv);
            });
        })
        .catch(error => console.error("Error loading events:", error));

  
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
    });
});
