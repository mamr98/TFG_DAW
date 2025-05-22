import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import Swal from "sweetalert2"
import Can from "../Components/hooks/Can";
import { useState, useEffect } from "react";
import PaginationControls from "./Profesor/PaginationControls";
import CelebrationConfetti from "@/Components/hooks/Confetti";

export default function NotasPage({ notas }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [notasAgrupadas, setNotasAgrupadas] = useState({});
  const [examenesPaginados, setExamenesPaginados] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiTimeout, setConfettiTimeout] = useState(null);

  useEffect(() => {
    // Agrupar las notas por examen
    const agrupadas = notas.reduce((acc, nota) => {
      if (!acc[nota.examen]) {
        acc[nota.examen] = {
          asignatura: nota.asignatura,
          alumnos: [],
        };
      }
      acc[nota.examen].alumnos.push({
        alumno: nota.alumno,
        nota: nota.nota,
      });
      return acc;
    }, {});
    setNotasAgrupadas(agrupadas);
  }, [notas]);

  useEffect(() => {
    // Paginación de los exámenes agrupados
    const examenes = Object.keys(notasAgrupadas);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const examenesPagina = examenes.slice(startIndex, endIndex);

    // Crear un nuevo objeto con solo los exámenes de la página actual
    const notasAgrupadasPagina = examenesPagina.reduce((acc, examen) => {
      acc[examen] = notasAgrupadas[examen];
      return acc;
    }, {});

    setExamenesPaginados(notasAgrupadasPagina);
  }, [notasAgrupadas, currentPage, itemsPerPage]);

  /* 
  * Función para exportar las notas a un archivo Excel
  * @param {string} examen - El nombre del examen
  * @param {Array} alumnos - La lista de alumnos y sus notas
  * @description Esta función genera un archivo Excel con las notas de los alumnos para el examen especificado.
  */
  const handleExportNotas = (examen, alumnos) => {
    //console.log("Exportando notas para el examen:", examen);
    //console.log("Alumnos:", alumnos);

    // Crea un excel con el tipo de dato que va a contener el archivo + la extensión y el idioma
    const excelNotas = "data:text/csv;charset=utf-8," + [
      ["Nombre", "Nota"],// encabezados del excel
      ...alumnos.map((alumno) => [alumno.alumno, parseFloat(alumno.nota)]), // rellenamos el excel con los datos 
    ]

      //.map((row) => row.join(",")) // unimos los datos con una coma
    // Salto de linea cuando pone el nombre y la nota de un alumno
      .join("\n");

    // Creamos un enlace para descargar el archivo
    const encodedUri = encodeURI(excelNotas);
    //Creamos un elemento <a> para descargar el archivo en HTML
    const descargaExcel = document.createElement("a");
    // Añadimos el atributo href con la URI codificada
    descargaExcel.setAttribute("href", encodedUri);
    // Añadimos el atributo download con el nombre del archivo
    descargaExcel.setAttribute("download", `${examen}.csv`);
    // Hacemos clic en el elemento <a> para iniciar la descarga
    descargaExcel.click();
    // Limpiamos el elemento <a> del DOM
    descargaExcel.remove();
  }

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

    // Verificar si hay algún 10 para activar el confetti
    const hasDiez = alumnos.some(alumno => alumno.nota === "10.00");
    console.log("¿Hay algún 10?", hasDiez);
    if (hasDiez) {
      console.log("¡Se encontró un 10! Activando confetti.");
      setShowConfetti(true);
      const timeoutId = setTimeout(() => {
        setShowConfetti(false);
        setConfettiTimeout(null); // Limpia el ID del timeout
      }, 6000);
      setConfettiTimeout(timeoutId); // Guarda el ID del timeout
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
          width: auto;
          min-width: 100%;
          border-collapse: separate;
          border-spacing: 0 8px;
          font-family: 'Segoe UI', sans-serif;
        }
        .notas-table th {
          color: #4b5563;
          font-weight: 600;
          padding: 12px 20px;
          text-align: left;
          font-size: 14px;
          background-color: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
          white-space: nowrap;
        }
        .notas-table td {
          padding: 14px 20px;
          font-size: 15px;
          border-bottom: 1px solid #f3f4f6;
          color: #4b5563;
          white-space: nowrap;
        }
        .notas-table tr:hover td {
          background-color: #f3f4f6;
        }
        .notas-table-container {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          scroll-padding: 50% 0 0 50%;
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
        <div class="notas-table-container">
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
      didOpen: () => {
        const popup = Swal.getPopup();
        const container = popup.querySelector('.notas-table-container');
        console.log('Contenedor .notas-table-container:', container);

        // Ajuste para móviles pequeños
        if (window.innerWidth <= 640) {
          popup.style.width = '95%';
          popup.style.maxWidth = '100%';

          // Centrado más preciso con timeout
          setTimeout(() => {
            const container = popup.querySelector('.notas-table-container');
            if (container) {
              // Fuerza el centrado después de la renderización
              container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;

              // Añade listener para mantener el centrado al cambiar tamaño
              const resizeObserver = new ResizeObserver(() => {
                container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
              });
              resizeObserver.observe(container);

              // Limpiar al cerrar
              popup.addEventListener('close', () => resizeObserver.disconnect());
            }
          }, 300); // Aumenté el delay para dispositivos lentos
        }
      },
      willClose: () => {
        // Limpiar cualquier event listener pendiente
        setShowConfetti(false);
      }
    })
  }

  useEffect(() => {
    return () => {
      // Función de limpieza que se ejecuta al desmontar el componente
      if (confettiTimeout) {
        clearTimeout(confettiTimeout); // Cancela el timeout si existe
      }
    };
  }, [confettiTimeout]);

  return (
    <AuthenticatedLayout
      header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Notas</h2>}
    >
      <Head title="Notas" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Can permission={"sinpermiso"}>
          {showConfetti && (
            <>
              {/* Cañón izquierdo */}
              <CelebrationConfetti
                isRaining={showConfetti}
                origin={{ x: 0.1, y: 0.95 }}
                angle={45}
              />
              
              {/* Cañón derecho */}
              <CelebrationConfetti
                isRaining={showConfetti}
                origin={{ x: 0.9, y: 0.95 }}
                angle={135}
              />
            </>
          )}
        </Can>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Exámenes corregidos</h1>
        <Can permissions={["permisoprofesor"]}>
          {Object.keys(examenesPaginados).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(examenesPaginados).map(([examen, data], index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2"></div>
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
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleVerNotasAlumnos(examen, data.alumnos)}
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm px-4 py-2 rounded-md hover:shadow-lg transition-all duration-200"
                        >
                          <span className="hidden sm:inline">Ver Notas</span>
                          <span className="inline sm:hidden">Notas</span>
                        </button>
                        <button
                          onClick={() => handleExportNotas(examen, data.alumnos)}
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm px-4 py-2 rounded-md hover:shadow-lg transition-all duration-200"
                        >
                          <span className="hidden sm:inline">Exportar Notas</span>
                          <span className="inline sm:hidden">Exportar</span>
                        </button>
                      </div>
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
          {Object.keys(examenesPaginados).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(examenesPaginados).map(([examen, data], index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2"></div>
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
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm px-4 py-2 rounded-md hover:shadow-lg transition-all duration-200"
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

        {Object.keys(notasAgrupadas).length > 0 && (
          <div className="mt-8">
            <PaginationControls
              currentPage={currentPage}
              totalItems={Object.keys(notasAgrupadas).length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  )
}
