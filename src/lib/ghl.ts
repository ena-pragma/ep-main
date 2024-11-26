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
    throw error;
  }
};

export const addContactForm = async (data: ContactFormData) => {
  try {
    const payload = {
      ...data,
      locationId: GHL_LOCATION_ID,
      tags: ["Website Contact"],
      source: data.source || "Website Contact Form",
      customField: [
        {
          id: "message",
          value: data.message,
        },
      ],
    };

    const response = await ghlClient.post("contacts/", payload);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
