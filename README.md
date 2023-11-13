# Ticket GPenna APP

## Descripción
Esta aplicación ofrece una solución integral para gestionar tareas, incidencias y proyectos de manera eficiente. Facilita la colaboración entre usuarios y profesionales al integrarse con Jira para una gestión más centralizada.

## Instalación
1. Asegúrate de tener Node.js instalado en tu sistema con una versión igual o superior a la 18.
   - Puedes descargar Node.js desde [nodejs.org](https://nodejs.org/).

2. Clona el repositorio desde GitHub usando la siguiente URL:
   ```bash
      git clone https://github.com/grupopenna/Incidencias-Front.git
   ```

3. Ejecuta el siguiente comando en la terminal para instalar las dependencias necesarias:
   ```bash
      npm install
   ```
## Configuración
1. Crear archivo .env en el directorio raiz del proyecto y agregar las siguientes variables de entorno:

   ```bash
      VITE_REDIRECT_URL=http://localhost:5174/
      VITE_BASE_URL=http://localhost:3002/api2
      VITE_BACK_AUTH_URL=http://localhost:3001/api1
      VITE_SOCKET_URL=http://localhost:3002
   ```

## Uso
Una vez instaladas las dependencias y configurado el archivo .env, puedes ejecutar la aplicación con el siguiente comando:

   ```bash
      npm run dev
   ```

## Características Principales
- Inicio de Sesión Seguro: Los usuarios deben iniciar sesión para acceder a la plataforma, asegurando la privacidad de la información personal.

- Registro de Usuarios: Después de ser aceptados, la información personal del usuario queda registrada para facilitar la conexión con Jira.

- Tablero de Proyectos e Incidencias: Los usuarios pueden acceder a tableros personalizados para cada proyecto, visualizando todas las incidencias relacionadas.

- Priorización de Tareas: Permite a los usuarios organizar y priorizar tareas según su importancia, optimizando la planificación del trabajo.

- Seguimiento en Tiempo Real: Visualización en tiempo real del estado de avance de cada tarea, incluyendo detalles sobre qué profesional está trabajando en ella.

- Comunicación Eficiente: Facilita la comunicación entre usuario y profesional mediante comentarios asociados a cada incidencia.

- Edición de Descripciones: Los usuarios pueden editar la descripción de las incidencias según sea necesario, garantizando la precisión de la información.

- Creación de Incidencias: Posibilidad de crear nuevas incidencias con título, descripción y la opción de adjuntar archivos relevantes.

- Sincronización con Jira: Cada incidencia creada se refleja tanto en la aplicación como en Jira, permitiendo una gestión integrada de tareas.

- Aprobación de Trabajo: Una vez que un profesional completa una tarea, la mueve a la columna de "Finalizado" para que el usuario pueda revisar y aprobar el trabajo.

## Modo de Uso
- Inicio de Sesión:
Ingresa con tus credenciales proporcionadas.
  - Mail
  - Contraseña

- Exploración de Tableros:
Accede al tablero del proyecto deseado.

- Visualización de Incidencias:
Observa todas las incidencias asociadas al proyecto, con detalles sobre su estado y asignación.

- Priorización de Tareas:
Ordena y prioriza tareas según su importancia.

- Comunicación con Profesionales:
Utiliza la función de comentarios para estar en contacto directo con los profesionales asignados.

- Edición de Descripciones:
Modifica las descripciones de las incidencias según sea necesario.

- Creación de Nuevas Incidencias:
Crea nuevas incidencias con título, descripción y archivos adjuntos si es necesario.

- Aprobación de Tareas Finalizadas:
Una vez que un profesional completa una tarea, revisa y aprueba el trabajo en la columna de "Finalizado".

- Sincronización con Jira:
Todas las incidencias creadas se reflejan tanto en la aplicación como en Jira para una gestión unificada.