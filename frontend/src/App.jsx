// Importamos React y el hook useState
import React, { useState } from 'react';

// Importamos la función que genera el diseño desde un archivo de servicios (probablemente usa una API como Replicate)
import { generateDesign } from './services/designService';

// Importamos los componentes hijos
import DesignForm from './components/DesignForm';
import ResultDisplay from './components/ResultDisplay';
import LoadingIndicator from './components/LoadingIndicator';

// Importamos los estilos generales de la aplicación
import './styles/App.css';

// Definimos el componente principal de la aplicación
function App() {
  // Estados para manejar los datos
  const [selectedFile, setSelectedFile] = useState(null);         // Archivo de imagen original
  const [previewUrl, setPreviewUrl] = useState(null);             // URL de vista previa de la imagen
  const [selectedStyle, setSelectedStyle] = useState('');         // Estilo seleccionado (ej: moderno, minimalista)
  const [selectedRoom, setSelectedRoom] = useState('');           // Tipo de habitación (ej: cocina, dormitorio)
  const [resultImage, setResultImage] = useState(null);           // Imagen del resultado generado por la IA
  const [isLoading, setIsLoading] = useState(false);              // Indica si está cargando
  const [error, setError] = useState(null);                       // Texto de error (si ocurre alguno)
  const [step, setStep] = useState('upload');                     // Controla qué se muestra: 'upload' o 'result'

  // Función para manejar la subida de una imagen
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Tomamos el primer archivo
    if (file) {
      setSelectedFile(file);                         // Guardamos el archivo original
      setPreviewUrl(URL.createObjectURL(file));      // Creamos una URL para mostrarlo en pantalla
      setStep('upload');                             // Nos aseguramos de estar en la vista de formulario
      setResultImage(null);                          // Reiniciamos el resultado anterior
    }
  };

  // Función que se llama cuando el usuario cambia el tipo de habitación
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  // Función que se llama al hacer clic en el botón "Generar diseño"
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    // Validación: comprobamos si falta algo
    if (!selectedFile || !selectedStyle || !selectedRoom) {
      setError("Por favor, completa todos los campos antes de generar el diseño.");
      return;
    }

    // Mostramos la animación de carga y limpiamos errores anteriores
    setIsLoading(true);
    setError(null);

    try {
      // Llamamos a la función que genera el diseño usando IA
      const result = await generateDesign(selectedFile, selectedStyle, selectedRoom);
      setResultImage(result.result); // Guardamos la imagen generada
      setStep('result');             // Cambiamos a la vista de resultado
    } catch (err) {
      setError('Error al generar el diseño. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false); // Ocultamos la animación de carga 
    }
  };

  // Función que permite volver a intentar (volver al formulario)
  const handleTryAgain = () => {
    setStep('upload'); // Volvemos a la vista de formulario
  };

  // Función que permite ver otro diseño distinto manteniendo la imagen actual
  const handleNextDesign = () => {
    setResultImage(null); // Quitamos el diseño actual
    setStep('upload');    // Volvemos al formulario
  };

  // Renderizado principal del componente
  return (
    <div className='app-container'>
      {/* Cabecera */}
      <header>
        <h1>Rediseña tu interior</h1>
      </header>

      {/* Contenido principal */}
      <main>
        {/* Mostramos el formulario si estamos en la etapa "upload" */}
        {step === 'upload' && (
          <DesignForm
            previewUrl={previewUrl}              // URL de vista previa de la imagen
            selectedStyle={selectedStyle}        // Estilo seleccionado
            selectedRoom={selectedRoom}          // Tipo de habitación seleccionada      
            isLoading={isLoading}                // Indica si se está generando un diseño
            error={error}                        // Mensaje de error si ocurre alguno      
            onFileChange={handleFileChange}      // Función para manejar el cambio de imagen
            onStyleChange={e => setSelectedStyle(e.target.value)} // Función para manejar el cambio de estilo
            onRoomChange={handleRoomChange}      // Función para manejar el cambio de habitación
            onSubmit={handleSubmit}              // Función que se ejecuta al hacer clic en "Generar diseño"
          />
        )}

        {/* Mostramos el resultado si estamos en la etapa "result" y hay una imagen */}
        {step === 'result' && resultImage && (
          <ResultDisplay
            resultImage={resultImage}            // Imagen generada por la IA
            onTryAgain={handleTryAgain}          // Volver a intentar con el mismo estilo
            onNextDesign={handleNextDesign}      // Ver otro diseño diferente
          />
        )}

        {/* Mostramos el indicador de carga si isLoading es true */}
        {isLoading && <LoadingIndicator />}
      </main>
    </div>
  );
}

// Exportamos el componente para que pueda ser usado en index.js
export default App;
