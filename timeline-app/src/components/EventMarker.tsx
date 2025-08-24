import React from 'react';
import { EventItem } from './types/EventItem.ts';

interface EventMarkerProps {
  event: EventItem;
  onSelect: () => void;
  isActive?: boolean;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, onSelect, isActive = false }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div 
      style={{ 
        textAlign: "center", 
        position: "relative", 
        flex: 1, 
        zIndex: 1 
      }} 
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Event: ${event.title} in ${event.year}. Click to view details.`}
      aria-current={isActive ? "true" : undefined}
      style={{
        ...{ 
          textAlign: "center", 
          position: "relative", 
          flex: 1, 
          zIndex: 1 
        },
        outline: 'none',
        borderRadius: '4px'
      }}
      onFocus={(e) => {
        e.target.style.outline = '2px solid #0066cc';
        e.target.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.target.style.outline = 'none';
      }}
    >
      <div 
        style={{ 
          width: "20px", 
          height: "20px", 
          backgroundColor: isActive ? "#0066cc" : "#dc3545", 
          borderRadius: "50%", 
          margin: "0 auto", 
          cursor: "pointer",
          border: isActive ? "3px solid #ffffff" : "2px solid #ffffff",
          boxShadow: isActive ? "0 0 0 2px #0066cc" : "none"
        }}
        aria-hidden="true"
      />
      <h3 
        style={{ 
          marginTop: "0.5rem", 
          fontSize: "1rem",
          color: "#333333" // Ensuring good contrast
        }}
      >
        {event.year}
      </h3>
      <p style={{ color: "#333333" }}>{event.title}</p>
      <img 
        src={event.imageURL} 
        alt={`Image for ${event.title}`} 
        style={{ maxWidth: "80px", marginTop: "0.5rem" }} 
      />
    </div>
  );
};

export default EventMarker;