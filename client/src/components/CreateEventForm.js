import React, { useState } from "react";
import { createEvent } from "../api"; // 👈 Make sure path is correct
import './CreateEventForm.css';

function CreateEventForm({ onAddEvent }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const { data } = await createEvent(form);
      onAddEvent(data); // add the new event to list
      alert("🎉 Event Created!");
      setForm({ title: "", date: "", location: "", imageUrl: "" });
    }
    .catch ((err) => {
      console.error("Error creating event:", err); // Shows full error object
      setError("Failed to create event. Please try again."); // Shows UI error (if you're using setError)
    });
    

  return (
    <form className="create-event-form" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <input
        name="title"
        type="text"
        placeholder="Event Title *"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        placeholder="Date *"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        type="text"
        placeholder="Location *"
        value={form.location}
        onChange={handleChange}
        required
      />
      <input
        name="imageUrl"
        type="url"
        placeholder="Image URL (optional)"
        value={form.imageUrl}
        onChange={handleChange}
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEventForm;

