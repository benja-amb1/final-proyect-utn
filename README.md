
API Inmobiliaria
================

Descripción
-----------
API desarrollada en Node.js con Express, TypeScript y MongoDB. Permite:
- Gestionar usuarios y propiedades.  
- Subir archivos (imágenes, documentos, etc.) usando Multer.  
- Enviar correos electrónicos mediante Nodemailer.  
- Servir archivos subidos mediante una ruta estática.  

Instalación
-----------
1. Clonar el repositorio:  
   git clone <https://github.com/benja-amb1/final-proyect-utn>  
   cd backend 

2. Instalar dependencias:  
   npm install   

3. Crear archivo `.env` en la raíz con las siguientes variables (ejemplo):  

  - NODE_ENV=production
  - PORT=3000  
  - MONGO_URI=<TU_URI_DE_MONGODB>  
  - JWT_SECRET=<TU_SECRETO_JWT>  
  - EMAIL_USER=<TU_EMAIL>  
  - EMAIL_PASS=<TU_APPCONTRASEÑA_EMAIL>  

Uso
---
Para iniciar la aplicación:  
npm run dev  
# o para producción:  
npm run build  
npm start  

La API estará disponible en `http://localhost:<PORT>` según tu archivo `.env`.  

Rutas / Endpoints
-----------------
### Raíz  
- GET `/`  
  Retorna un JSON indicando que la API está operativa:  
  `{ "status": true }`  

### Autenticación / Usuarios  
- /auth → rutas de registro, login, logout, etc. *(definidas en tu UserRoutes)*  

### Propiedades  
- /propiedades → rutas para obtener, crear, actualizar y eliminar propiedades *(definidas en tu PropiedadRoutes)*  

### Subida de archivos  
- POST `/uploads` → subida de archivos con Multer.  
- GET `/uploads/<nombre_del_archivo>` → sirve los archivos estáticos subidos.  

### Email  
- POST `/email/send` → envía un correo usando Nodemailer.  
  Ejemplo de cuerpo (body):  
  ```json
  {
    "mail": "destinatario@example.com",
    "subject": "Asunto del correo",
    "message": "Cuerpo del mensaje"
  }

---

# Middlewares

- CORS — para permitir solicitudes cruzadas.
- Morgan — logging HTTP.
- Logger personalizado — para loguear eventos / errores.
- Cookie Parser — para manejo de cookies.
- Rate Limit — límite de solicitudes en rutas /auth.
- Multer — para manejo de subida de archivos.
- Nodemailer — para envío de correos electrónicos.