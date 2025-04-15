import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import Swal from "sweetalert2"
import Can from "../Components/hooks/Can";

export default function NotasPage({ notas }) {
  // Agrupar las notas por examen
  const notasAgrupadas = notas.reduce((acc, nota) => {
    if (!acc[nota.examen]) {
      acc[nota.examen] = {
        asignatura: nota.asignatura,
        alumnos: [],
      }
    }
    acc[nota.examen].alumnos.push({
      alumno: nota.alumno,
      nota: nota.nota,
    })
    return acc
  }, {})

  const handleVerNotasAlumnos = (examen, alumnos) => {
    if (alumnos.length === 0) {
      Swal.fire({
        title: '<span class="text-gray-800 font-semibold">No hay notas disponibles</span>',
        html: '<div class="flex items-center justify-center p-4 bg-amber-50 rounded-lg mb-4"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div><p class="text-gray-600">Este examen aún no tiene notas registradas.</p>',
        showConfirmButton: true,
        confirmButtonColor: "#10b981",
        confirmButtonText: '<span class="px-2">Entendido</span>',
        customClass: {
          popup: "rounded-xl shadow-xl border border-gray-100",
        },
        background: "#ffffff",
      })
      return
    }

    // Convertir el contenido a una cadena de texto
    const html = `
      <style>
        .notas-container {
          max-height: 400px;
          overflow-y: auto;
          padding: 0 4px;
          margin-top: 16px;
        }
        .notas-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .notas-icon {
          background-color: rgba(16, 185, 129, 0.1);
          border-radius: 50%;
          padding: 10px;
          margin-right: 12px;
        }
        .notas-title {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }
        .notas-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }
        .notas-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
          font-family: 'Segoe UI', sans-serif;
        }
        .notas-table th {
          color: #4b5563;
          font-weight: 600;
          padding: 12px 16px;
          text-align: left;
          font-size: 14px;
          background-color: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }
        .notas-table td {
          padding: 14px 16px;
          font-size: 15px;
          border-bottom: 1px solid #f3f4f6;
          color: #4b5563;
        }
        .notas-table tr:hover td {
          background-color: #f3f4f6;
        }
        .nota-value {
          font-weight: 600;
          display: inline-block;
          padding: 4px 12px;
          border-radius: 9999px;
          background-color: rgba(16, 185, 129, 0.1);
          color: #047857;
        }
        .alumno-name {
          display: flex;
          align-items: center;
        }
        .alumno-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          color: #6b7280;
          font-weight: 600;
          font-size: 12px;
        }
      </style>
      <div class="notas-header">
        <div class="notas-icon">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <div class="notas-title">${examen}</div>
        </div>
      </div>
      <div class="notas-container">
        <table class="notas-table">
          <thead>
            <tr>
              <th>Alumno</th>
              <th style="text-align: center;">Nota</th>
            </tr>
          </thead>
          <tbody>
            ${alumnos
              .map(
                (alumno) => `
                  <tr>
                    <td>
                      <div class="alumno-name">
                        <div class="alumno-avatar">${alumno.alumno.charAt(0).toUpperCase()}</div>
                        ${alumno.alumno}
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <span class="nota-value">${alumno.nota}</span>
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `

    Swal.fire({
      title: "",
      html,
      showConfirmButton: true,
      confirmButtonColor: "#10b981",
      confirmButtonText: '<span class="px-3">Cerrar</span>',
      width: "600px",
      padding: "24px",
      customClass: {
        popup: "rounded-xl shadow-xl border border-gray-100",
        confirmButton: "rounded-lg text-sm font-medium",
      },
      background: "#ffffff",
      backdrop: "rgba(0,0,0,0.4)",
    })
  }

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Notas</h2>}
    >
      <Head title="Notas" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Examenes corregidos</h1>
        <Can permissions={["permisoprofesor"]}>
        {Object.keys(notasAgrupadas).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(notasAgrupadas).map(([examen, data], index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-emerald-500 dark:bg-emerald-600 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{examen}</h3>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{data.asignatura}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {data.alumnos.length} examenes corregidos
                    </div>
                    <button
                      onClick={() => handleVerNotasAlumnos(examen, data.alumnos)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      Ver notas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No hay notas disponibles.</p>
          </div>
        )}</Can>

          <Can permissions={["sinpermiso"]}>
        {Object.keys(notasAgrupadas).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(notasAgrupadas).map(([examen, data], index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-emerald-500 dark:bg-emerald-600 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{examen}</h3>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{data.asignatura}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleVerNotasAlumnos(examen, data.alumnos)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                      Ver nota
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No hay notas disponibles.</p>
          </div>
        )}</Can>
      </div>
    </AuthenticatedLayout>
  )
}
