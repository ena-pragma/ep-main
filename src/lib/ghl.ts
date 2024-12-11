import axios from "axios";

const GHL_API_KEY = import.meta.env.VITE_GHL_API_KEY;
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID;

if (!GHL_API_KEY) {
  console.error("Missing VITE_GHL_API_KEY environment variable");
}

if (!GHL_LOCATION_ID) {
  console.error("Missing VITE_GHL_LOCATION_ID environment variable");
}

const ghlClient = axios.create({
  baseURL: "https://rest.gohighlevel.com/v1/",
  headers: {
    Authorization: `Bearer ${GHL_API_KEY}`,
    "Content-Type": "application/json",
  },
});

interface ContactFormData {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  message?: string;
  source?: string;
  tags?: string[];
}

interface NoteData {
  contactId: string;
  body: string;
}

export const addContact = async (email: string, name?: string) => {
  try {
    const payload = {
      email,
      firstName: name,
      locationId: GHL_LOCATION_ID,
      tags: ["Newsletter Subscriber"],
      source: "Website Newsletter",
    };

    const response = await ghlClient.post("contacts/", payload);
    return response.data;
  } catch (error: any) {
    console.error("Error adding contact:", error.response?.data || error.message);
    throw error;
  }
};

export const addContactForm = async (data: ContactFormData) => {
  try {
    const payload = {
      ...data,
      locationId: GHL_LOCATION_ID,
      tags: data.tags || [],
      source: data.source || "Website Contact Form",
    };

    const response = await ghlClient.post("contacts/", payload);
    return response.data;
  } catch (error: any) {
    console.error("Error adding contact form:", error.response?.data || error.message);
    throw error;
  }
};

export const addNote = async (data: NoteData) => {
  try {
    const payload = {
      body: data.body,
    };

    const response = await ghlClient.post(`contacts/${data.contactId}/notes`, payload);
    return response.data;
  } catch (error: any) {
    console.error("Error adding note:", error.response?.data || error.message);
    throw error;
  }
};

export const findContactByEmail = async (email: string) => {
  try {
    const response = await ghlClient.get(`contacts/lookup?email=${email}`);
    return response.data;
  } catch (error: any) {
    console.error("Error finding contact:", error.response?.data || error.message);
    throw error;
  }
};