import { useEffect, useState } from "react";
import { Edit, Trash2, Eye, Search, X } from "lucide-react";

interface Usuario {
  id_usuario: number;
  nombre_completo: string;
  apellido_completo: string;
  correo: string;
  clave: string;
  sexo: string;
  fecha_nacimiento: string;
  id_cargo: number;
  run: string;
}

interface FormData {
  run: string;
  nombre_completo: string;
  apellido_completo: string;
  correo: string;
  sexo: string;
  fecha_nacimiento: string;
}

export default function PacientList() {
  const [pacientes, setPacientes] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    run: "",
    nombre_completo: "",
    apellido_completo: "",
    correo: "",
    sexo: "",
    fecha_nacimiento: "",
  });

  useEffect(() => {
    const listarPacientes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/usuario");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de pacientes");
        }
        const pacientes = await response.json();
        setPacientes(pacientes);
      } catch (e) {
        console.error(e);
      }
    };

    listarPacientes();
  }, []);

  const handleAgregarPaciente = () => {
    setShowModal(true);
  };

  const handleCancelar = () => {
    setShowModal(false);
    setFormData({
      run: "",
      nombre_completo: "",
      apellido_completo: "",
      correo: "",
      sexo: "",
      fecha_nacimiento: "",
    });
  };

  const handleGuardar = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          clave: "default123", // Contraseña por defecto
          id_cargo: 2, // Cargo de paciente
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el paciente");
      }

      const nuevoPaciente = await response.json();
      setPacientes([...pacientes, nuevoPaciente]);
      handleCancelar();
      alert("Paciente agregado exitosamente");
    } catch (e) {
      console.error(e);
      alert("Error al guardar el paciente");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVer = (id: number) => {
    alert(`Ver detalles del paciente ${id}`);
  };

  const handleEditar = (id: number) => {
    alert(`Editar paciente ${id}`);
  };

  const handleEliminar = (id: number) => {
    if (confirm("¿Está seguro de eliminar este paciente?")) {
      setPacientes(pacientes.filter((p) => p.id_usuario !== id));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent w-full">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-600">Doctor</p>
                <h4 className="text-xl font-bold text-indigo-900">
                  Anacletto Metralla
                </h4>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Listado de Pacientes
              </h3>
            </div>
            <button
              onClick={handleAgregarPaciente}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md"
            >
              Agregar Paciente
            </button>
          </div>
        </div>

        {/* Tabla de pacientes */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-2 text-left font-semibold">Nombres</th>
                <th className="px-6 py-2 text-left font-semibold">Apellidos</th>
                <th className="px-6 py-2 text-left font-semibold">Edad</th>
                <th className="px-6 py-2 text-left font-semibold">Sexo</th>
                <th className="px-6 py-2 text-center font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente, index) => (
                <tr
                  key={paciente.id_usuario}
                  className={`border-b hover:bg-indigo-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-2 text-gray-800">
                    {paciente.nombre_completo}
                  </td>
                  <td className="px-6 py-2 text-gray-800">
                    {paciente.apellido_completo}
                  </td>
                  <td className="px-6 py-2 text-gray-800">
                    {paciente.fecha_nacimiento}
                  </td>
                  <td className="px-6 py-2 text-gray-800">{paciente.sexo}</td>
                  <td className="px-6 py-2">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleVer(paciente.id_usuario)}
                        className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Search size={18} />
                      </button>

                      <button
                        onClick={() => handleVer(paciente.id_usuario)}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditar(paciente.id_usuario)}
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleEliminar(paciente.id_usuario)}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer con total de pacientes */}
        <div className="mt-6 text-center text-white">
          <p className="text-lg">
            Total de pacientes:{" "}
            <span className="font-bold text-white">{pacientes.length}</span>
          </p>
        </div>
      </div>

      {/* Modal para agregar paciente */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
            {/* Header del Modal */}
            <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-2xl font-bold">Agregar Nuevo Paciente</h2>
              <button
                onClick={handleCancelar}
                className="hover:bg-indigo-700 rounded-full p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Formulario */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Carnet de Identidad */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Carnet de Identidad
                  </label>
                  <input
                    type="text"
                    name="run"
                    value={formData.run}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Ej: 12345678-9"
                  />
                </div>

                {/* Nombres */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombres
                  </label>
                  <input
                    type="text"
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Ej: Juan Carlos"
                  />
                </div>

                {/* Apellidos */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="apellido_completo"
                    value={formData.apellido_completo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Ej: González Pérez"
                  />
                </div>

                {/* Correo */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Ej: correo@ejemplo.com"
                  />
                </div>

                {/* Sexo */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sexo
                  </label>
                  <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  >
                    <option value="">Seleccione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>

                {/* Fecha de Nacimiento */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleCancelar}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardar}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}