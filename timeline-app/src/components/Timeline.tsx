import React, { useState, useEffect } from 'react';
import EventMarker from './EventMarker.tsx';
import { EventItem } from './types/Eventitem.ts';

interface TimelineProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onSelectEvent }) => {
  const [activeEventIndex, setActiveEventIndex] = useState<number>(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (events.length === 0) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setActiveEventIndex(prev => {
            const newIndex = prev < events.length - 1 ? prev + 1 : 0;
            // Focus the new active element
            setTimeout(() => {
              const markers = document.querySelectorAll('[role="button"][aria-label*="Event:"]');
              (markers[newIndex] as HTMLElement)?.focus();
            }, 0);
            return newIndex;
          });
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setActiveEventIndex(prev => {
            const newIndex = prev > 0 ? prev - 1 : events.length - 1;
            // Focus the new active element
            setTimeout(() => {
              const markers = document.querySelectorAll('[role="button"][aria-label*="Event:"]');
              (markers[newIndex] as HTMLElement)?.focus();
            }, 0);
            return newIndex;
          });
          break;
        case 'Enter':
        case ' ':
          if (activeEventIndex >= 0 && activeEventIndex < events.length) {
            e.preventDefault();
            onSelectEvent(events[activeEventIndex]);
          }
          break;
      }
    };

    // Only add event listener if timeline is focused
    const timelineElement = document.querySelector('[role="region"][aria-label*="Timeline"]');
    if (timelineElement) {
      timelineElement.addEventListener('keydown', handleKeyDown as any);
      return () => timelineElement.removeEventListener('keydown', handleKeyDown as any);
    }
  }, [events, activeEventIndex, onSelectEvent]);

  const handleMarkerSelect = (event: EventItem, index: number) => {
    setActiveEventIndex(index);
    onSelectEvent(event);
  };

  return (
    <div 
      role="region"
      aria-label={`Timeline with ${events.length} events. Use arrow keys to navigate between events.`}
      tabIndex={0}
      style={{ 
        position: "relative", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start", 
        margin: "3rem auto", 
        maxWidth: "1200px", 
        padding: "2rem",
        outline: "none"
      }}
      onFocus={(e) => {
        if (events.length > 0 && activeEventIndex === -1) {
          setActiveEventIndex(0);
        }
        e.target.style.outline = '2px solid #0066cc';
        e.target.style.outlineOffset = '2px';
        e.target.style.borderRadius = '4px';
      }}
      onBlur={(e) => {
        e.target.style.outline = 'none';
      }}
    >
      {/* Timeline line with better contrast */}
      <div 
        style={{ 
          content: '', 
          position: "absolute", 
          top: "40px", 
          left: 0, 
          width: "100%", 
          height: "4px", 
          backgroundColor: "#333333", // Better contrast than red
          zIndex: 0 
        }}
        aria-hidden="true"
      />
      
      {events.length === 0 && (
        <p 
          style={{ 
            textAlign: "center", 
            color: "#666666", 
            fontSize: "1.1rem",
            margin: "2rem auto"
          }}
        >
          No events to display. Add events to see them on the timeline.
        </p>
      )}
      
      {events.map((event, index) => (
        <EventMarker 
          key={`${event.title}-${event.year}-${index}`} 
          event={event} 
          onSelect={() => handleMarkerSelect(event, index)}
          isActive={index === activeEventIndex}
        />
      ))}
    </div>
  );
};

export default Timeline;