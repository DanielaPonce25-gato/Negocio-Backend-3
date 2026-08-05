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
- Mongoose
- Faker.js
- Multer
- BcryptJS
- Winston
- Dotenv
- CORS
- Swagger (swagger-jsdoc y swagger-ui-express)
- Mocha
- Chai
- Supertest

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
npm install mongoose
npm install multer
npm install winston


Para instalar todas las Dependencias
npm install

# dependencias de desarrollo:

npm install -D @faker-js/faker 
npm install -D chai 
npm install -D mocha 
npm install -D supertest 
npm install -D nodemon

```

---

# Variables de entorno

Crear un archivo `.env`

Ejemplo

```env
PORT=8000

MONGO_URI=mongodb://localhost:27017/shipnow

MONGODB_TEST_URI=

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

# Ejecutar tests

```bash
npm test

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


# Documentación Swagger

La API cuenta con documentación interactiva utilizando **Swagger UI** y **swagger-jsdoc**, permitiendo visualizar, probar y conocer la estructura de todos los endpoints disponibles.

La documentación incluye:

* Rutas disponibles de la API.
* Parámetros requeridos.
* Respuestas esperadas.
* Códigos HTTP utilizados.
* Modelos de datos mediante schemas.
* Ejemplos de request y response.

---

# Acceso a Swagger

Una vez iniciado el servidor, la documentación puede consultarse en:

```
http://localhost:8000/api/docs
```

---

# Configuración Swagger

Swagger fue implementado utilizando:

* `swagger-jsdoc` para generar la documentación desde comentarios JSDoc.
* `swagger-ui-express` para mostrar la interfaz gráfica.

La configuración se encuentra dentro de:

```
config/
└── swagger.js
```

---

# Schemas documentados

Se crearon modelos dentro de `components.schemas` para representar las entidades principales de la aplicación.

## Usuarios

Schemas disponibles:

* `User`
* `UserCreate`
* `UserUpdate`
* `MockUser`

Incluye documentación de:

* Datos personales.
* Roles del sistema.
* Direcciones.
* Documentos.
* Imágenes.
* Creación y actualización de usuarios.

---

## Productos

Schemas disponibles:

* `Product`
* `ProductCreate`
* `ProductUpdate`
* `MockProduct`

Incluye documentación de:

* Información del producto.
* Precio.
* Stock.
* Categorías.
* Imágenes.
* Usuario vendedor.
* Fechas de creación y actualización.

---

## Tiendas

Schemas disponibles:

* `Store`
* `StoreCreate`
* `StoreUpdate`
* `MockStore`

Incluye documentación de:

* Propietario.
* Nombre y descripción.
* Dirección.
* Contacto.
* Imágenes.
* Estado activo de la tienda.

---

## Órdenes

Schemas disponibles:

* `Order`
* `OrderCreate`
* `MockOrder`
* `OrderProduct`
* `DeliveryAddress`

Incluye documentación de:

* Comprador.
* Tienda asociada.
* Productos comprados.
* Dirección de entrega.
* Estado de la orden.
* Prioridad.
* Comprobante.
* Fechas de creación y actualización.

---

## Datos Mock

Schemas disponibles:

* `MockUser`
* `MockProduct`
* `MockStore`
* `MockOrder`

Los endpoints Mock permiten:

* Generar usuarios ficticios.
* Generar productos ficticios.
* Generar tiendas ficticias.
* Generar órdenes ficticias.
* Generar un conjunto completo de datos.
* Guardar datos de prueba en MongoDB.

Disponible únicamente en entorno de desarrollo.

---

# Endpoints documentados en Swagger

## Usuarios

Documentados:

```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

---

## Productos

Documentados:

```
GET    /api/products
GET    /api/products/categories
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Tiendas

Documentados:

```
GET    /api/stores
GET    /api/stores/:id
GET    /api/stores/owner/:ownerId
POST   /api/stores
PUT    /api/stores/:id
DELETE /api/stores/:id
```

---

## Órdenes

Documentados:

```
GET    /api/orders
GET    /api/orders/:id
GET    /api/orders/buyer/:buyerId
GET    /api/orders/store/:storeId
POST   /api/orders
PATCH  /api/orders/:id/status
PATCH  /api/orders/:id/priority
PATCH  /api/orders/:id/proof
DELETE /api/orders/:id
```

---

## Mock

Documentados:

```
GET  /api/mocks/mockingusers
GET  /api/mocks/mockingproducts
GET  /api/mocks/mockingorders
GET  /api/mocks/mockingstores
GET  /api/mocks/mockingall
POST /api/mocks/generateData
```

---

# Respuestas de error documentadas

Swagger incluye un schema común:

```
ErrorResponse
```

Este schema es reutilizado por todos los endpoints de la API para documentar las respuestas de error.

La API implementa un sistema centralizado de manejo de errores mediante un middleware global, por lo que todas las respuestas de error mantienen la misma estructura, variando únicamente el código HTTP, el mensaje y el tipo de error según la situación.

Utilizado para representar errores generados por:

* Validaciones.
* Recursos inexistentes.
* Errores de base de datos.
* Errores internos del servidor.

Ejemplo:

```json
{
    "status": "error",
    "message": "Error al obtener el recurso",
    "error": null
}
```

---

# Beneficios de la documentación Swagger

✔ Permite probar la API sin herramientas externas.

✔ Facilita la integración con frontend.

✔ Mantiene documentados los contratos de la API.

✔ Centraliza ejemplos de request y response.

✔ Permite verificar rápidamente cambios en endpoints y modelos.

```
```


# Manejo de errores

La API implementa un sistema centralizado de manejo de errores basado en:

- Factory `createError()`
- Diccionario `ERROR_DICTIONARY`
- Middleware global de errores `errorHandler`
- Función `apiErrorResponse()`

Todas las excepciones son procesadas por el middleware global, devolviendo una respuesta consistente para todos los endpoints.

Ejemplo

```json
{
    "status": "error",
    "message": "Datos de entrada inválidos",
    "error": "VALIDATION_ERROR"
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

El logger se implementa mediante un middleware (addLogger), por lo que todas las peticiones son registradas automáticamente. Además, el middleware global de manejo de errores registra el detalle de cada excepción para facilitar el diagnóstico y la depuración de la aplicación.
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
├── tests/
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

### tests 

Contiene las pruebas funcionales de la API utilizando Mocha, Chai y Supertest. 

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
