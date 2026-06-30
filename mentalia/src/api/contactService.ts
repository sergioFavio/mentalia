interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  telephone: string;
  intereses: string;
}

import { apiFetch } from "./client";

export const sendEmail = async (payload: ContactEmailPayload) => {
  const response = await apiFetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "No se pudo enviar el correo");
  }

  return {
    status: "OK",
    message: data.message || "Se envio el correo correctamente",
  };
};
