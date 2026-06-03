import { Event } from '../lib/utils';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type ExtraItem = {
  id?: string;
  name: string;
  price: string;
  description?: string;
};

export type OrganizerEventPayload = {
  title: string;
  description: string;
  date: string;
  location: string;
  price: string;
  is_published: boolean;
  extra_items: ExtraItem[];
};

async function handleResponse(response: Response) {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.error ?? 'Falha ao conectar com a API de eventos.');
  }
  return payload;
}

export async function fetchPublicEvents() {
  const response = await fetch(`${API_BASE_URL}/api/events`);
  const data = await handleResponse(response);
  return data.events as Event[];
}

export async function fetchEventById(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/events/${id}`);
  const data = await handleResponse(response);
  return data.event as Event;
}

export async function fetchOrganizerEvents() {
  const response = await fetch(`${API_BASE_URL}/api/organizer/events`);
  const data = await handleResponse(response);
  return data.events as Event[];
}

export async function createOrganizerEvent(payload: OrganizerEventPayload) {
  const response = await fetch(`${API_BASE_URL}/api/organizer/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse(response);
  return data.event as Event;
}

export async function updateOrganizerEvent(id: string, payload: OrganizerEventPayload) {
  const response = await fetch(`${API_BASE_URL}/api/organizer/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await handleResponse(response);
  return data.event as Event;
}
