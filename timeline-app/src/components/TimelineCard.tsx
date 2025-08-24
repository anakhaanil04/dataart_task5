import "./TimelineCard.css";

function TimelineCard({ event }) {
  return (
    <article 
      className="timeline-card"
      role="article"
      aria-labelledby={`event-title-${event.title.replace(/\s+/g, '-').toLowerCase()}`}
      style={{
        border: "1px solid #cccccc",
        borderRadius: "8px",
        padding: "1rem",
        margin: "1rem 0",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h3 
        id={`event-title-${event.title.replace(/\s+/g, '-').toLowerCase()}`}
        style={{ 
          margin: "0 0 0.5rem 0",
          color: "#333333",
          fontSize: "1.25rem"
        }}
      >
        {event.title}
      </h3>
      <time 
        dateTime={event.date}
        style={{ 
          display: "block",
          fontWeight: "bold",
          color: "#666666",
          marginBottom: "0.5rem"
        }}
      >
        {new Date(event.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </time>
      {event.description && (
        <p style={{ 
          margin: "0",
          color: "#333333",
          lineHeight: "1.5"
        }}>
          {event.description}
        </p>
      )}
    </article>
  );
}

export default TimelineCard;