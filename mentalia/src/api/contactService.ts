interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  telephone: string;
  intereses: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const sendEmail = async (payload: ContactEmailPayload) => {
  const response = await fetch(`${API_URL}/api/contact`, {
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