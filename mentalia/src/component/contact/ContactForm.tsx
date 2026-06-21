import { useState } from "react";
import { sendEmail } from "../../api/contactService";
import IconSend from "../../iconos/IconSend";
import CheckBox from "../ui/CheckBox";
import Input from "../ui/Input";

const interests = [
  {
    id: 1,
    text: "Evaluacion emocional",
  },
  {
    id: 2,
    text: "Monitoreo de pacientes",
  },
  {
    id: 3,
    text: "Tecnologia IA",
  },
  {
    id: 4,
    text: "Alianza institucional",
  },
];

const ContactForm = () => {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    message: string;
    telephone: string;
    intereses: number[];
  }>({
    name: "",
    email: "",
    message: "",
    telephone: "",
    intereses: [],
  });

  const handleSend = async () => {
    if (!form.name.trim()) {
      return alert("El nombre es obligatorio");
    }
    if (!form.email.trim()) {
      return alert("El correo es obligatorio");
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      return alert("Ingresa un correo valido");
    }
    if (!form.message.trim()) {
      return alert("El mensaje es obligatorio");
    }
    if (!form.telephone.trim()) {
      return alert("El telefono es obligatorio");
    }

    const telregexp = /^\+?\d{7,15}$/;
    if (!telregexp.test(form.telephone)) {
      return alert("El telefono debe tener solo numeros y puede iniciar con +");
    }

    try {
      const response = await sendEmail({
        ...form,
        intereses: form.intereses
          .map(
            (interesid) =>
              interests.find((interes) => interes.id === interesid)?.text ?? ""
          )
          .join(", "),
      });

      alert(`${response.status}: ${response.message}`);
      setForm({
        name: "",
        email: "",
        message: "",
        telephone: "",
        intereses: [],
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo enviar el correo");
    }
  };

  return (
    <form
      className="w-full max-w-md lg:w-96 gap-6 bg-white rounded-lg text-black px-6 lg:px-8 py-6 flex flex-col overflow-hidden justify-between"
      onSubmit={(event) => {
        event.preventDefault();
        handleSend();
      }}
    >
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto mt-2">
        <div className="hidden lg:flex flex-col gap-3">
          <h3 className="font-bold mt-2">Estoy interesado en</h3>
          <div className="flex gap-1 flex-wrap">
            {interests.map((interes) => (
              <CheckBox
                key={interes.id}
                text={interes.text}
                name="interes"
                checked={form.intereses.includes(interes.id)}
                onChange={(checked) => {
                  if (!checked) {
                    setForm((prev) => ({
                      ...prev,
                      intereses: prev.intereses.filter(
                        (interesid) => interesid !== interes.id
                      ),
                    }));
                    return;
                  }

                  setForm((prev) => ({
                    ...prev,
                    intereses: [...prev.intereses, interes.id],
                  }));
                }}
              />
            ))}
          </div>
        </div>

        <Input
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Tu nombre"
        />
        <Input
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Tu correo"
          type="email"
        />
        <textarea
          value={form.message}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="Tu mensaje"
          className="w-full min-h-24 resize-none placeholder:text-gray-400 border-b-2 border-gray-300 focus:border-purple-800 text-sm px-2 py-1 outline-none"
        />
        <Input
          value={form.telephone}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, telephone: event.target.value }))
          }
          placeholder="Tu WhatsApp"
          type="tel"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-purple-800 border-purple-800 cursor-pointer px-2 py-1 text-sm border rounded-md w-fit flex gap-2 items-center self-center lg:self-start"
      >
        <div className="w-4 h-4">
          <IconSend />
        </div>
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
