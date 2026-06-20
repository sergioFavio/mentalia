import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowLeft,
  Edit,
  Eye,
  GitCompare,
  History,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

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

const historyActionIconSize = 15.4;
const uploadAudioIconSize = 13.2;

export default function PacientList() {
  const pacientesPorPagina = 6;
  const { isAuthenticated } = useAuth();
  const [pacientes, setPacientes] = useState<Usuario[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Usuario | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    run: "",
    nombre_completo: "",
    apellido_completo: "",
    correo: "",
    sexo: "",
    fecha_nacimiento: "",
  });
  const [editFormData, setEditFormData] = useState<FormData>({
    run: "",
    nombre_completo: "",
    apellido_completo: "",
    correo: "",
    sexo: "",
    fecha_nacimiento: "",
  });

  const cargarPacientes = async () => {
    const response = await fetch("http://localhost:5000/api/usuario");
    if (!response.ok) {
      throw new Error("Error al obtener los datos de pacientes");
    }

    const pacientes = (await response.json()) as Usuario[];
    setPacientes(pacientes);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const listarPacientes = async () => {
      try {
        await cargarPacientes();
      } catch (e) {
        console.error(e);
      }
    };

    listarPacientes();
  }, [isAuthenticated]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(pacientes.length / pacientesPorPagina)
  );
  const indiceInicio = (paginaActual - 1) * pacientesPorPagina;
  const pacientesPaginados = pacientes.slice(
    indiceInicio,
    indiceInicio + pacientesPorPagina
  );

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [paginaActual, totalPaginas]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
      const camposCompletos = Object.values(formData).every(
        (value) => value.trim() !== ""
      );

      if (!camposCompletos) {
        alert("Complete todos los campos antes de guardar el paciente");
        return;
      }

      const nuevoPacienteData = {
        ...formData,
        sexo: obtenerValorSexo(formData.sexo),
        clave: "default123",
        id_cargo: 2,
      };

      const response = await fetch("http://localhost:5000/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoPacienteData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el paciente");
      }

      const responseText = await response.text();
      let nuevoPaciente: Usuario | null = null;

      if (responseText.trim().startsWith("{")) {
        try {
          nuevoPaciente = JSON.parse(responseText) as Usuario;
        } catch (e) {
          console.error(e);
        }
      }

      if (nuevoPaciente?.id_usuario) {
        setPacientes((prev) => {
          const pacientesActualizados = [...prev, nuevoPaciente];
          setPaginaActual(
            Math.ceil(pacientesActualizados.length / pacientesPorPagina)
          );
          return pacientesActualizados;
        });
      } else {
        try {
          await cargarPacientes();
        } catch (e) {
          console.error(e);
        }
      }

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

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const obtenerTextoSexo = (sexo: string) => {
    const sexoNormalizado = sexo.trim().toUpperCase();

    if (sexoNormalizado === "M" || sexoNormalizado === "MASCULINO") {
      return "Masculino";
    }

    if (sexoNormalizado === "F" || sexoNormalizado === "FEMENINO") {
      return "Femenino";
    }

    return sexo || "No especificado";
  };

  const obtenerValorSexo = (sexo: string) => {
    const sexoNormalizado = sexo.trim().toUpperCase();

    if (sexoNormalizado === "M" || sexoNormalizado === "MASCULINO") {
      return "Masculino";
    }

    if (sexoNormalizado === "F" || sexoNormalizado === "FEMENINO") {
      return "Femenino";
    }

    return sexo;
  };

  const handleVer = (id: number) => {
    const paciente = pacientes.find((p) => p.id_usuario === id);
    if (paciente) {
      setSelectedPaciente(paciente);
      setShowViewModal(true);
    }
  };

  const handleCerrarVer = () => {
    setShowViewModal(false);
    setSelectedPaciente(null);
  };

  const handleHistorial = (id: number) => {
    const paciente = pacientes.find((p) => p.id_usuario === id);
    if (paciente) {
      setSelectedPaciente(paciente);
      setShowHistoryModal(true);
    }
  };

  const handleCerrarHistorial = () => {
    setShowHistoryModal(false);
    setSelectedPaciente(null);
  };

  const handleSubirAudio = () => {
    audioInputRef.current?.click();
  };

  const handleAudioSeleccionado = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = event.target.files?.[0];
    if (!audio) return;

    alert(`Audio seleccionado: ${audio.name}`);
    event.target.value = "";
  };

  const handleCompararAudios = () => {
    alert("Selecciona los audios que deseas comparar.");
  };

  const handleCompararUltimoConPrimero = () => {
    alert("Se comparara el ultimo audio con el primer audio registrado.");
  };

  const handleEditar = (id: number) => {
    const paciente = pacientes.find((p) => p.id_usuario === id);
    if (paciente) {
      setSelectedPaciente(paciente);
      setEditFormData({
        run: paciente.run,
        nombre_completo: paciente.nombre_completo,
        apellido_completo: paciente.apellido_completo,
        correo: paciente.correo,
        sexo: obtenerValorSexo(paciente.sexo),
        fecha_nacimiento: paciente.fecha_nacimiento,
      });
      setShowEditModal(true);
    }
  };

  const handleCancelarEditar = () => {
    setShowEditModal(false);
    setSelectedPaciente(null);
    setEditFormData({
      run: "",
      nombre_completo: "",
      apellido_completo: "",
      correo: "",
      sexo: "",
      fecha_nacimiento: "",
    });
  };

  const handleGuardarEditar = async () => {
    if (!selectedPaciente) return;

    try {
      const camposCompletos = Object.values(editFormData).every(
        (value) => value.trim() !== ""
      );

      if (!camposCompletos) {
        alert("Complete todos los campos antes de actualizar el paciente");
        return;
      }

      const pacienteEditado: FormData = {
        ...editFormData,
        sexo: obtenerValorSexo(editFormData.sexo),
      };

      const response = await fetch(
        `http://localhost:5000/api/usuario/${selectedPaciente.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pacienteEditado),
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        let mensajeError = "Error al actualizar el paciente";

        if (responseText.trim().startsWith("{")) {
          try {
            const errorData = JSON.parse(responseText) as { error?: string };
            mensajeError = errorData.error ?? mensajeError;
          } catch (e) {
            console.error(e);
          }
        } else if (responseText.trim()) {
          mensajeError = responseText;
        }

        throw new Error(mensajeError);
      }

      let pacienteActualizado: Usuario = {
        ...selectedPaciente,
        ...pacienteEditado,
      };

      if (responseText.trim().startsWith("{")) {
        try {
          pacienteActualizado = JSON.parse(responseText) as Usuario;
        } catch (e) {
          console.error(e);
        }
      }

      setPacientes(
        pacientes.map((p) =>
          p.id_usuario === selectedPaciente.id_usuario
            ? pacienteActualizado
            : p
        )
      );

      try {
        await cargarPacientes();
      } catch (e) {
        console.error(e);
      }

      handleCancelarEditar();
      alert("Paciente actualizado exitosamente");
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Error al actualizar el paciente");
    }
  };

  const handleEliminar = (id: number) => {
    if (confirm("¿Está seguro de eliminar este paciente?")) {
      setPacientes((prev) => prev.filter((p) => p.id_usuario !== id));
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
                <th className="px-5 py-1.5 text-left font-semibold">Nombres</th>
                <th className="px-5 py-1.5 text-left font-semibold">Apellidos</th>
                <th className="px-5 py-1.5 text-left font-semibold">Edad</th>
                <th className="px-5 py-1.5 text-left font-semibold">Sexo</th>
                <th className="px-5 py-1.5 text-center font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pacientesPaginados.map((paciente, index) => (
                <tr
                  key={paciente.id_usuario}
                  className={`border-b hover:bg-indigo-50 transition-colors ${
                    (indiceInicio + index) % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-1.5 text-gray-800">
                    {paciente.nombre_completo}
                  </td>
                  <td className="px-5 py-1.5 text-gray-800">
                    {paciente.apellido_completo}
                  </td>
                  <td className="px-5 py-1.5 text-gray-800">
                    {paciente.fecha_nacimiento}
                  </td>
                  <td className="px-5 py-1.5 text-gray-800">{paciente.sexo}</td>
                  <td className="px-5 py-1.5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleHistorial(paciente.id_usuario)}
                        className="p-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                        title="Ver historial"
                      >
                        <Search size={16} />
                      </button>

                      <button
                        onClick={() => handleVer(paciente.id_usuario)}
                        className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEditar(paciente.id_usuario)}
                        className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleEliminar(paciente.id_usuario)}
                        className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-white">
          <p className="text-sm">
            Mostrando {pacientes.length === 0 ? 0 : indiceInicio + 1}-
            {Math.min(indiceInicio + pacientesPorPagina, pacientes.length)} de{" "}
            {pacientes.length} pacientes
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Anterior
            </button>

            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map(
              (pagina) => (
                <button
                  key={pagina}
                  onClick={() => setPaginaActual(pagina)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    paginaActual === pagina
                      ? "bg-white text-indigo-700 font-bold"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {pagina}
                </button>
              )
            )}

            <button
              onClick={() =>
                setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Footer con total de pacientes */}
        <div className="mt-3 text-center text-white">
          <p className="text-base">
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
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
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

      {/* Modal para editar paciente */}
      {showEditModal && selectedPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
            {/* Header del Modal */}
            <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-2xl font-bold">Editar Paciente</h2>
              <button
                onClick={handleCancelarEditar}
                className="hover:bg-green-700 rounded-full p-1 transition-colors"
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
                    value={editFormData.run}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    value={editFormData.nombre_completo}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    value={editFormData.apellido_completo}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    value={editFormData.correo}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    value={editFormData.sexo}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  >
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
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
                    value={editFormData.fecha_nacimiento}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleCancelarEditar}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarEditar}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium shadow-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para historial medico del paciente */}
      {showHistoryModal && selectedPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl mx-4">
            <div className="bg-orange-600 text-white px-6 py-4 rounded-t-lg flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
              <div>
                <h2 className="text-2xl font-bold">Historial Médico</h2>
                <p className="text-sm mt-1">
                  Paciente: {selectedPaciente.nombre_completo}{" "}
                  {selectedPaciente.apellido_completo}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCerrarHistorial}
                  className="px-3 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: historyActionIconSize,
                      height: historyActionIconSize,
                    }}
                  >
                    <ArrowLeft size={historyActionIconSize} />
                  </span>
                  Regresar
                </button>

                <button
                  type="button"
                  onClick={handleSubirAudio}
                  className="px-3 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: uploadAudioIconSize,
                      height: uploadAudioIconSize,
                    }}
                  >
                    <Upload size={uploadAudioIconSize} />
                  </span>
                  Subir audio
                </button>

                <button
                  type="button"
                  onClick={handleCompararAudios}
                  className="px-3 py-2 bg-violet-500 hover:bg-violet-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: uploadAudioIconSize,
                      height: uploadAudioIconSize,
                    }}
                  >
                    <GitCompare size={uploadAudioIconSize} />
                  </span>
                  Comparar audios
                </button>

                <button
                  type="button"
                  onClick={handleCompararUltimoConPrimero}
                  className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 shadow-sm"
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: uploadAudioIconSize,
                      height: uploadAudioIconSize,
                    }}
                  >
                    <History size={uploadAudioIconSize} />
                  </span>
                  Comparar ultimo con primer audio
                </button>

                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleAudioSeleccionado}
                />

                <button
                  type="button"
                  onClick={handleCerrarHistorial}
                  className="bg-indigo-500 hover:bg-indigo-600 rounded-full p-1.5 transition-colors shadow-sm"
                  aria-label="Cerrar historial medico"
                >
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: historyActionIconSize,
                      height: historyActionIconSize,
                    }}
                  >
                    <X size={historyActionIconSize} />
                  </span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-100 text-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">
                        Audio
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Reproducir
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Sentimiento
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-left font-semibold">
                        Análisis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No hay audios registrados para este paciente.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCerrarHistorial}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium shadow-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ver detalles del paciente */}
      {showViewModal && selectedPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
            {/* Header del Modal */}
            <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-2xl font-bold">Detalles del Paciente</h2>
              <button
                onClick={handleCerrarVer}
                className="hover:bg-blue-700 rounded-full p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Carnet de Identidad */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Carnet de Identidad
                  </label>
                  <input
                    type="text"
                    value={selectedPaciente.run}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Nombres */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombres
                  </label>
                  <input
                    type="text"
                    value={selectedPaciente.nombre_completo}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Apellidos */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    value={selectedPaciente.apellido_completo}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Correo */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={selectedPaciente.correo}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Sexo */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sexo
                  </label>
                  <input
                    type="text"
                    value={obtenerTextoSexo(selectedPaciente.sexo)}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>

                {/* Fecha de Nacimiento */}
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="text"
                    value={selectedPaciente.fecha_nacimiento}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              {/* Botón */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCerrarVer}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
