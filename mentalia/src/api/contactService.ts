interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  telephone: string;
  intereses: string;
}

const CONTACT_EMAIL = "info@tecnopolis.ai";

export const sendEmail = async ({
  name,
  email,
  message,
  telephone,
  intereses,
}: ContactEmailPayload) => {
  const subject = `Nuevo contacto de ${name}`;
  const body = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Telefono: ${telephone}`,
    `Intereses: ${intereses || "No especificados"}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  return {
    status: "OK",
    message: "Se preparo el correo en tu cliente de email",
  };
};
