import { useEffect, useState } from "react";
import { Edit, Trash2, Eye, Search } from "lucide-react";

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

export default function PacientList() {
  const [pacientes, setPacientes] = useState<Usuario[]>([]);

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
    alert("Funcionalidad para agregar paciente");
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
                  <td className="px-6 py-2 text-gray-800">{paciente.fecha_nacimiento}</td>
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
    </div>
  );
}
