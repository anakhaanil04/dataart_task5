import { useState } from "react";
import "./EventForm.css";

function EventForm({ onAddEvent }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = "Event title is required";
    }
    
    if (!date) {
      newErrors.date = "Event date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    const newEvent = { title: title.trim(), date, description: description.trim() };
    onAddEvent(newEvent);

    setTitle("");
    setDate("");
    setDescription("");
    setErrors({});
    
    // Announce success to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = `Event "${newEvent.title}" has been added to the timeline`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      role="form"
      aria-labelledby="form-heading"
      style={{ marginBottom: "2rem" }}
    >
      <h3 id="form-heading" style={{ marginBottom: "1rem", color: "#333333" }}>
        Add New Event
      </h3>
      
      <div style={{ marginBottom: "1rem" }}>
        <label 
          htmlFor="title"
          style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#333333"
          }}
        >
          Event Title *
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) {
              setErrors(prev => ({ ...prev, title: null }));
            }
          }}
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "title-error" : undefined}
          required
          style={{
            padding: "0.5rem",
            border: errors.title ? "2px solid #dc3545" : "1px solid #cccccc",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "300px"
          }}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #0066cc';
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        />
        {errors.title && (
          <div 
            id="title-error" 
            role="alert"
            style={{ 
              color: "#dc3545", 
              fontSize: "0.875rem", 
              marginTop: "0.25rem" 
            }}
          >
            {errors.title}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label 
          htmlFor="date"
          style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#333333"
          }}
        >
          Event Date *
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            if (errors.date) {
              setErrors(prev => ({ ...prev, date: null }));
            }
          }}
          aria-invalid={errors.date ? "true" : "false"}
          aria-describedby={errors.date ? "date-error" : undefined}
          required
          style={{
            padding: "0.5rem",
            border: errors.date ? "2px solid #dc3545" : "1px solid #cccccc",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "300px"
          }}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #0066cc';
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        />
        {errors.date && (
          <div 
            id="date-error" 
            role="alert"
            style={{ 
              color: "#dc3545", 
              fontSize: "0.875rem", 
              marginTop: "0.25rem" 
            }}
          >
            {errors.date}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label 
          htmlFor="description"
          style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "bold",
            color: "#333333"
          }}
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          placeholder="Enter event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{
            padding: "0.5rem",
            border: "1px solid #cccccc",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "300px",
            resize: "vertical",
            fontFamily: "inherit"
          }}
          onFocus={(e) => {
            e.target.style.outline = '2px solid #0066cc';
            e.target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.target.style.outline = 'none';
          }}
        />
      </div>

      <button 
        type="submit"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0066cc",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
          fontWeight: "bold"
        }}
        onFocus={(e) => {
          e.target.style.outline = '2px solid #ffffff';
          e.target.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.target.style.outline = 'none';
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#0052a3';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#0066cc';
        }}
      >
        Add Event
      </button>
    </form>
  );
}

export default EventForm;