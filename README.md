# ShipNow API

## Descripción

ShipNow API es una API REST desarrollada con **Node.js**, **Express** y **MongoDB** para administrar un marketplace de compras.

La aplicación permite gestionar:

- Usuarios
- Productos
- Tiendas
- Órdenes
- Datos Mock para pruebas

Además, incorpora un sistema centralizado de manejo de errores mediante una **Factory (`createError`)**, un **diccionario de errores (`ERROR_DICTIONARY`)**, middleware global de excepciones y un sistema de **logs con Winston**.

---

# Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Faker.js
- Multer
- BcryptJS
- Winston
- Dotenv
- CORS

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/DanielaPonce25-gato/Negocio-Backend-3.git
```

Ingresar al proyecto

```bash
cd Negocio-Backend-3
```

# Instalar dependencias

```bash
npm install bcryptjs
npm install cors
npm install dotenv
npm install express
npm install mongodb
npm install mongoose
npm install multer
npm install winston
npm install winston-daily-rotate-file

Para instalar todas las Dependencias
npm install

# dependencias de desarrollo:

npm install -D @faker-js/faker
npm install -D nodemon

```

---

# Variables de entorno

Crear un archivo `.env`

Ejemplo

```env
PORT=8000

MONGO_URI=mongodb://localhost:27017/shipnow

NODE_ENV=development
```

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

Servidor

```
http://localhost:8000
```

---

# Endpoints

## Usuarios

| Método | Endpoint |
|---------|----------|
| GET | /api/users |
| GET | /api/users/:id |
| POST | /api/users |
| PUT | /api/users/:id |
| DELETE | /api/users/:id |

---

## Productos

| Método | Endpoint |
|---------|----------|
| GET | /api/products |
| GET | /api/products/categories |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

## Tiendas

| Método | Endpoint |
|---------|----------|
| GET | /api/stores |
| GET | /api/stores/:id |
| GET | /api/stores/owner/:ownerId |
| POST | /api/stores |
| PUT | /api/stores/:id |
| DELETE | /api/stores/:id |

---

## Órdenes

| Método | Endpoint |
|---------|----------|
| GET | /api/orders |
| GET | /api/orders/:id |
| GET | /api/orders/buyer/:buyerId |
| GET | /api/orders/store/:storeId |
| POST | /api/orders |
| PATCH | /api/orders/:id/status |
| PATCH | /api/orders/:id/priority |
| PATCH | /api/orders/:id/proof |
| DELETE | /api/orders/:id |

---

## Mocking

Disponible únicamente en desarrollo.

| Método | Endpoint |
|---------|----------|
| GET | /api/mocks/mockingusers |
| GET | /api/mocks/mockingproducts |
| GET | /api/mocks/mockingorders |
| GET | /api/mocks/mockingstores |
| GET | /api/mocks/mockingall |
| POST | /api/mocks/generateData |

---

# Manejo de errores

La API implementa un sistema centralizado de manejo de errores basado en:

- Factory `createError()`
- Diccionario `ERROR_DICTIONARY`
- Middleware global de errores

Cada error devuelve una respuesta consistente.

Ejemplo

```json
{
    "status":"error",
    "code":"VALIDATION_ERROR",
    "message":"Datos de entrada inválidos"
}
```

Errores implementados

- VALIDATION_ERROR
- CREATE_ERROR
- UPDATE_ERROR
- DELETE_ERROR
- GET_ERROR
- GET_ALL_ERROR
- DATABASE_ERROR
- USER_NOT_FOUND
- PRODUCT_NOT_FOUND
- STORE_NOT_FOUND
- ORDER_NOT_FOUND
- USER_ALREADY_EXISTS
- ROUTE_NOT_FOUND
- INTERNAL_SERVER_ERROR

---

# Logger

La aplicación utiliza **Winston** para registrar:

- Información
- Advertencias
- Errores
- Solicitudes HTTP

Los errores también son registrados por el middleware global.

---

# Arquitectura

```
.
├── config/
├── constants/
├── controllers/
├── css/
├── middleware/
├── models/
├── repositories/
├── routes/
├── services/
├── tools/
├── uploads/
├── utils/
├── views/
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
└── package-lock.json
```

---

# Organización del proyecto

### config

Configuración general de la aplicación.

### constants

Constantes utilizadas por la aplicación.

### controllers

Reciben las peticiones HTTP y generan las respuestas.

### middleware

Middleware de logger, manejo global de errores y rutas inexistentes.

### models

Modelos de Mongoose.

### repositories

Acceso a la base de datos.

### services

Contienen la lógica de negocio y las validaciones.

### routes

Definición de los endpoints.

### utils

Funciones auxiliares, respuestas de la API, Factory de errores y diccionario de errores.

### uploads

Almacenamiento de imágenes subidas por los usuarios.

### views

Páginas HTML del proyecto.

---

# Funcionalidades

✔ CRUD completo de Usuarios

✔ CRUD completo de Productos

✔ CRUD completo de Tiendas

✔ CRUD completo de Órdenes

✔ Generación de datos Mock

✔ Manejo centralizado de errores

✔ Logger con Winston

✔ Validaciones de negocio

✔ Middleware global de errores

✔ Arquitectura por capas

---

# Autor

**Daniela Mabel Ponce Diomedi**

Proyecto desarrollado para el curso de Backend.
