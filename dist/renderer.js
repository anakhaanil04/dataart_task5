import { openModal } from "./modal.js";
export function renderTimeline(events) {
    const timeline = document.getElementById("timeline");
    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("timeline-event");
        eventDiv.innerHTML = `
      <div class="circle"></div>
      <h3>${event.year}</h3>
      <p>${event.title}</p>
      <img src="${event.imageURL}" alt="${event.title}">
    `;
        eventDiv.addEventListener("click", () => openModal(event));
        timeline.appendChild(eventDiv);
    });
}
