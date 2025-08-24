import React, { useEffect, useRef } from 'react';
import { EventItem } from './types/EventItem.ts';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (event) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = 'auto';
      
      // Return focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [event]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      
      // Trap focus within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (event) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [event, onClose]);

  if (!event) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        backgroundColor: "rgba(0, 0, 0, 0.6)", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        zIndex: 1000
      }}
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ 
          background: "#ffffff", 
          padding: "2rem", 
          borderRadius: "8px", 
          maxWidth: "400px", 
          textAlign: "center",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          border: "1px solid #cccccc"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          ref={closeButtonRef}
          onClick={onClose} 
          style={{ 
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent", 
            border: "1px solid #cccccc", 
            fontSize: "1.5rem",
            width: "32px",
            height: "32px",
            borderRadius: "4px",
            cursor: "pointer",
            color: "#333333"
          }}
          aria-label="Close modal"
          onFocus={(e) => {
            e.target.style.outline = '2px solid #0066cc';
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        >
          ×
        </button>
        <h2 
          id="modal-title"
          style={{ 
            marginTop: "0", 
            marginBottom: "1rem",
            color: "#333333"
          }}
        >
          {event.title}
        </h2>
        <p style={{ 
          fontSize: "1.1rem", 
          fontWeight: "bold",
          color: "#333333",
          marginBottom: "1rem"
        }}>
          {event.year}
        </p>
        <img 
          src={event.imageURL} 
          alt={`Detailed image for ${event.title}`} 
          style={{ 
            maxWidth: "200px",
            height: "auto",
            marginBottom: "1rem"
          }} 
        />
        <p 
          id="modal-description"
          style={{ 
            color: "#333333",
            lineHeight: "1.5",
            margin: "0"
          }}
        >
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default EventModal;