import React from 'react';
//Importamos la lista de estilos y tipos de habitacion desde archivos externos
import { styles } from './styles.js';
import { roomTypes } from './roomTypes.js';

//Componente funcional llamado DesignForm, que recibe varias props desde el componente padre
const DesignForm = ({
  previewUrl,           // URL de la imagen que el usuario ha subido
  selectedStyle,        // Estilo seleccionado por el usuario
  selectedRoom,         // Tipo de habitación seleccionada
  isLoading,            // Indica si se está generando un diseño (true/false)
  error,                // Mensaje de error si ocurre alguno
  onFileChange,         // Función para manejar el cambio de imagen
  onStyleChange,        // Función para manejar el cambio de estilo
  onRoomChange,         // Función para manejar el cambio de habitación
  onSubmit              // Función que se ejecuta al hacer clic en "Generar diseño"
}) => {
  return (
    <div className= "design-form">
      <div className = "image-upload-container">
        {/*Si ya hay una imagen cargada, mostramos la vista previa */}
        {previewUrl ? (
          <div className="preview-container">
            <img src={previewUrl} alt="Vista previa" className="preview-image" />
            <button  
              className = " change-image-btn"
              onClick={() => document.getElementById('file-input').click()}
            >
              Cambiar imagen
            </button>
          </div>
        ) : (
           // Si NO hay imagen subida, mostramos una zona para hacer clic y subir imagen
           <div
           className="upload-placeholder"
           onClick={()=> document.getElementById('file-input').click()}
           >
              {/* Icono de "+" como botón visual */}
              <div className="upload-icon">+</div>
              <p>Subir imagen</p>

           </div>         

        )}

         {/* Campo real de tipo file para subir la imagen.
            Está oculto con display: none y se activa al hacer click en la zona de carga */}
        <input 
        type="file"
        id = "file-input"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: 'none' }}
        />
      </div>

      
      {/* Solo mostramos el formulario de opciones si hay imagen cargada */}
      {previewUrl && (
        <div className ="options-container">

          {/* Selector de estilo */}
          <div className= " selection-group">
            <label className="selection-label">Style</label>
             {/* Menú desplegable con los estilos disponibles */}
             <select 
              value = { selectedStyle} // Valor actual seleccionado
              onChange={onStyleChange} //Funcion que se llama cuando el usuario cambia el valor
              className ="style-select"
            >
            {/* Opción por defecto que no selecciona nada */}
              <option value=" ">Selecciona un estilo</option>

              {/* Mapeamos la lista de estilos para crear las opciones del menú */}
              {styles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

           {/* Selector de tipo de habitación */}
          <div className="selection-group">
            <label className="selection-label">ROOM</label>
             {/* Menú desplegable con los tipos de habitación */}
             <select 
              value={selectedRoom} // Valor actual seleccionado
              onChange={onRoomChange} //Funcion que se llama cuando el usuario cambia el valor
              className="room-select"
              >
                <option value="">Selecciona el tipo de habitacion</option>

                {/*Generamos cada opcion usando roomTypes */}
                {roomTypes.map((room) =>(
                  <option key={room.value} value={room.value}>
                    {room.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón para generar el diseño basado en imagen + estilo + habitación */}
            <button
              className = "generate-btn"
              onClick={onSubmit} // Llama a la función para generar el diseño
              disabled={
                isLoading || // Deshabilitado si se está generando un diseño o no hay imagen, estilo o habitación seleccionados
                !previewUrl || // Deshabilitado si no hay imagen subida
                !selectedStyle || // Deshabilitado si no hay estilo seleccionado
                !selectedRoom 
              }

            >
              {/* Cmbia el texto si esta cargando*/}
              {isLoading ? 'Generando...' : 'Generar diseño'}

            </button>
          </div>
        )}
         {/* Si hay error, mostramos el mensaje */}
         {error && <div className="error-message">{error}</div>}
        </div>
      );
    };

// Exportamos el componente para poder importarlo en otros archivos
export default DesignForm