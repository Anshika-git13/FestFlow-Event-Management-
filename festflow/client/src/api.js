import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5000/api", 
});

// Get all events
export const fetchEvents = () => API.get("/events");


export const createEvent = (newEvent) => API.post("/events", newEvent);
