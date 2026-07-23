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

| Método | Endpoint |  Descripción |
|---------|----------|--------------------------------------------------------------------------------|
| GET | /api/users |  Obtiene la lista de todos los usuarios registrados (sin incluir la contraseña). 
| GET | /api/users/:id |  Obtiene la información de un usuario específico a partir de su ID.
| POST | /api/users |  Crea un nuevo usuario con los datos enviados en la solicitud.
| PUT | /api/users/:id |  Actualiza la información de un usuario existente identificado por su ID.
| DELETE | /api/users/:id |  Elimina un usuario de la base de datos según su ID.

---

## Productos

| Método | Endpoint |  Descripción |
|---------|----------|----------------------------------------------------------------------------------------------------|
| GET | /api/products | Obtiene la lista de todos los productos registrados junto con la información de su vendedor.
| GET | /api/products/categories | Obtiene la lista de todas las categorías de productos disponibles, sin repetir valores.
| GET | /api/products/:id |  Obtiene la información de un producto específico a partir de su ID.
| POST | /api/products |  Crea un nuevo producto con los datos enviados en la solicitud.
| PUT | /api/products/:id |  Actualiza la información de un producto existente identificado por su ID. 
| DELETE | /api/products/:id |  Elimina un producto de la base de datos según su ID.

---

## Tiendas

| Método | Endpoint |  Descripción |
|---------|----------|----------------------------------------------------------------------------------------------------|
| GET | /api/stores |  Obtiene la lista de todas las tiendas activas junto con la información de su propietario.
| GET | /api/stores/:id |  Obtiene la información de una tienda específica a partir de su ID.
| GET | /api/stores/owner/:ownerId |   Obtiene todas las tiendas asociadas a un propietario determinado mediante su ID.
| POST | /api/stores |   Crea una nueva tienda con los datos enviados en la solicitud.
| PUT | /api/stores/:id |   Actualiza la información de una tienda existente identificada por su ID.
| DELETE | /api/stores/:id |   	Elimina una tienda de la base de datos según su ID.

---

## Órdenes

| Método | Endpoint |  Descripción |
|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| GET | /api/orders |    Obtiene la lista de todas las órdenes registradas, ordenadas de la más reciente a la más antigua.
| GET | /api/orders/:id |  Obtiene la información de una orden específica a partir de su ID, incluyendo los datos del comprador, la tienda y los productos asociados.
| GET | /api/orders/buyer/:buyerId |    Obtiene todas las órdenes realizadas por un comprador específico.
| GET | /api/orders/store/:storeId |    Obtiene todas las órdenes asociadas a una tienda específica.
| POST | /api/orders |  Crea una nueva orden con los datos enviados en la solicitud. 
| PATCH | /api/orders/:id/status |   Actualiza el estado de una orden existente.
| PATCH | /api/orders/:id/priority |    Actualiza la prioridad de una orden existente.
| PATCH | /api/orders/:id/proof |    Actualiza el comprobante de pago asociado a una orden.
| DELETE | /api/orders/:id |    Elimina una orden de la base de datos según su ID.

---

## Mocking

Disponible únicamente en desarrollo.

| Método | Endpoint |  Descripción |
|---------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| GET | /api/mocks/mockingusers |    Genera y devuelve usuarios ficticios sin almacenarlos en la base de datos.
| GET | /api/mocks/mockingproducts |    Genera y devuelve productos ficticios sin almacenarlos en la base de datos.
| GET | /api/mocks/mockingorders |    Genera y devuelve órdenes ficticias sin almacenarlas en la base de datos.
| GET | /api/mocks/mockingstores |    Genera y devuelve tiendas ficticias sin almacenarlas en la base de datos.
| GET | /api/mocks/mockingall |    Genera y devuelve un conjunto completo de datos ficticios (usuarios, productos, órdenes y tiendas).
| POST | /api/mocks/generateData |    Genera datos ficticios y los guarda en la base de datos para realizar pruebas de la aplicación.

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

### tools 

Scripts JavaScript del frontend para la interacción con las vistas y el consumo de la API.

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
