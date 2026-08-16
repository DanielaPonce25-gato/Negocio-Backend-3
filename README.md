# ShipNow API

## Descripción

ShipNow API es una API REST desarrollada con **Node.js**, **Express** y **MongoDB** para administrar un marketplace de compras.

La aplicación permite gestionar:

* Usuarios
* Productos
* Tiendas
* Órdenes
* Datos Mock para pruebas

Además, incorpora:

* Sistema centralizado de manejo de errores mediante una **Factory (`createError`)**.
* Diccionario de errores mediante **`ERROR_DICTIONARY`**.
* Middleware global de manejo de excepciones.
* Sistema de logs mediante **Winston**.
* Carga y validación de archivos mediante **Multer**.
* Almacenamiento de imágenes, documentos y comprobantes de pago.
* Documentación interactiva mediante **Swagger UI**.
* Pruebas funcionales mediante **Mocha, Chai y Supertest**.
* Arquitectura organizada por capas.

---

# Tecnologías utilizadas

* Node.js
* Express
* Mongoose
* Faker.js
* Multer
* BcryptJS
* Winston
* Dotenv
* CORS
* Swagger (`swagger-jsdoc` y `swagger-ui-express`)
* Mocha
* Chai
* Supertest

---

# Instalación

## Clonar el repositorio

```bash
git clone https://github.com/DanielaPonce25-gato/Negocio-Backend-3.git
```

## Ingresar al proyecto

```bash
cd Negocio-Backend-3
```

## Instalar todas las dependencias

```bash
npm install
```

Las principales dependencias utilizadas por el proyecto son:

```bash
npm install bcryptjs
npm install cors
npm install dotenv
npm install express
npm install mongoose
npm install multer
npm install winston
```

### Dependencias de desarrollo

```bash
npm install -D @faker-js/faker
npm install -D chai
npm install -D mocha
npm install -D supertest
npm install -D nodemon
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=8000

MONGODB_URI=mongodb://localhost:27017/shipnow

MONGODB_TEST_URI=mongodb://localhost:27017/shipnow_test

NODE_ENV=development
```

### Variables

| Variable           | Descripción                                     |
| ------------------ | ----------------------------------------------- |
| `PORT`             | Puerto utilizado por el servidor                |
| `MONGODB_URI`      | URI de conexión a la base de datos principal    |
| `MONGODB_TEST_URI` | URI utilizada durante la ejecución de los tests |
| `NODE_ENV`         | Entorno de ejecución de la aplicación           |

Los tests utilizan una base de datos independiente para evitar afectar los datos del entorno principal.

---

# Ejecutar el proyecto

## Modo desarrollo

```bash
npm run dev
```

## Modo producción

```bash
npm start
```

Servidor:

```text
http://localhost:8000
```

---

# Ejecutar tests

La aplicación cuenta con pruebas funcionales desarrolladas con **Mocha, Chai y Supertest**.

Para ejecutarlas:

```bash
npm test
```

Los tests utilizan la base de datos definida en `MONGODB_TEST_URI`.

La suite incluye pruebas para:

* Usuarios
* Tiendas
* Órdenes
* Mocking
* Casos de error
* Actualización del comprobante de pago
* Validaciones de respuestas HTTP
* Validación de estructuras de los objetos retornados

---

# Endpoints

## Usuarios

| Método | Endpoint         | Descripción                                                                   |
| ------ | ---------------- | ----------------------------------------------------------------------------- |
| GET    | `/api/users`     | Obtiene la lista de todos los usuarios registrados sin incluir la contraseña. |
| GET    | `/api/users/:id` | Obtiene la información de un usuario específico a partir de su ID.            |
| POST   | `/api/users`     | Crea un nuevo usuario con los datos enviados en la solicitud.                 |
| PUT    | `/api/users/:id` | Actualiza la información de un usuario existente identificado por su ID.      |
| POST | `/api/users/:id/documents` | Agrega un documento a un usuario existente.                           |
| DELETE | `/api/users/:id` | Elimina un usuario de la base de datos según su ID.                           |

---

### Archivos al crear un usuario

Al crear un usuario mediante:

```text
POST /api/users
```

se debe enviar obligatoriamente **un documento en formato PDF** mediante `multipart/form-data`.

La carga de una imagen es **opcional**.

* `document`: **obligatorio**, máximo 1 archivo, formato PDF.
* `images`: opcional, máximo 1 archivo, formatos JPEG, PNG, WEBP o GIF.

El documento se almacena en:

```text
uploads/documents/
```

La información del archivo se guarda en MongoDB asociada al usuario.

---

## Productos

| Método | Endpoint                   | Descripción                                                                                  |
| ------ | -------------------------- | -------------------------------------------------------------------------------------------- |
| GET    | `/api/products`            | Obtiene la lista de todos los productos registrados junto con la información de su vendedor. |
| GET    | `/api/products/categories` | Obtiene la lista de categorías de productos disponibles sin repetir valores.                 |
| GET    | `/api/products/:id`        | Obtiene la información de un producto específico a partir de su ID.                          |
| POST   | `/api/products`            | Crea un nuevo producto con los datos enviados en la solicitud.                               |
| PUT    | `/api/products/:id`        | Actualiza la información de un producto existente identificado por su ID.                    |
| DELETE | `/api/products/:id`        | Elimina un producto de la base de datos según su ID.                                         |

---

## Tiendas

| Método | Endpoint                     | Descripción                                                                               |
| ------ | ---------------------------- | ----------------------------------------------------------------------------------------- |
| GET    | `/api/stores`                | Obtiene la lista de todas las tiendas activas junto con la información de su propietario. |
| GET    | `/api/stores/:id`            | Obtiene la información de una tienda específica a partir de su ID.                        |
| GET    | `/api/stores/owner/:ownerId` | Obtiene todas las tiendas asociadas a un propietario determinado mediante su ID.          |
| POST   | `/api/stores`                | Crea una nueva tienda con los datos enviados en la solicitud.                             |
| PUT    | `/api/stores/:id`            | Actualiza la información de una tienda existente identificada por su ID.                  |
| DELETE | `/api/stores/:id`            | Elimina una tienda de la base de datos según su ID.                                       |

---

## Órdenes

| Método | Endpoint                     | Descripción                                                                                                           |
| ------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/orders`                | Obtiene la lista de todas las órdenes registradas, ordenadas de la más reciente a la más antigua.                     |
| GET    | `/api/orders/:id`            | Obtiene la información de una orden específica a partir de su ID, incluyendo comprador, tienda y productos asociados. |
| GET    | `/api/orders/buyer/:buyerId` | Obtiene todas las órdenes realizadas por un comprador específico.                                                     |
| GET    | `/api/orders/store/:storeId` | Obtiene todas las órdenes asociadas a una tienda específica.                                                          |
| POST   | `/api/orders`                | Crea una nueva orden con los datos enviados en la solicitud.                                                          |
| PATCH  | `/api/orders/:id/status`     | Actualiza el estado de una orden existente.                                                                           |
| PATCH  | `/api/orders/:id/priority`   | Actualiza la prioridad de una orden existente.                                                                        |
| PATCH  | `/api/orders/:id/proof`      | Actualiza el comprobante de pago asociado a una orden.                                                                |
| DELETE | `/api/orders/:id`            | Elimina una orden de la base de datos según su ID.                                                                    |

### Comprobante de pago

El endpoint:

```text
PATCH /api/orders/:id/proof
```

permite cargar o actualizar el comprobante de pago de una orden.

El archivo debe enviarse mediante `multipart/form-data` utilizando el campo:

```text
proof
```

El comprobante debe ser un archivo **PDF**.

El archivo físico se almacena en:

```text
uploads/proof/
```

Mientras que la información del archivo se almacena en MongoDB asociada a la orden.

La información almacenada incluye:

* `originalName`
* `fileName`
* `path`
* `mimeType`
* `size`

De esta manera, cada orden mantiene la referencia al comprobante actualmente asociado.

---

## Mocking

Los endpoints Mock están disponibles únicamente en el entorno de desarrollo.

| Método | Endpoint                     | Descripción                                                                 |
| ------ | ---------------------------- | --------------------------------------------------------------------------- |
| GET    | `/api/mocks/mockingusers`    | Genera y devuelve usuarios ficticios sin almacenarlos en la base de datos.  |
| GET    | `/api/mocks/mockingproducts` | Genera y devuelve productos ficticios sin almacenarlos en la base de datos. |
| GET    | `/api/mocks/mockingorders`   | Genera y devuelve órdenes ficticias sin almacenarlas en la base de datos.   |
| GET    | `/api/mocks/mockingstores`   | Genera y devuelve tiendas ficticias sin almacenarlas en la base de datos.   |
| GET    | `/api/mocks/mockingall`      | Genera y devuelve un conjunto completo de datos ficticios.                  |
| POST   | `/api/mocks/generateData`    | Genera datos ficticios y los guarda en MongoDB para realizar pruebas.       |

---

# Carga y validación de archivos

La aplicación utiliza **Multer** para gestionar y validar la carga de archivos.

Se contemplan tres tipos principales de archivos: **imágenes, documentos y comprobantes de pago**.

### Imágenes

Las imágenes admitidas son:

* JPEG
* PNG
* WebP
* GIF

Las imágenes se almacenan en:

```text
uploads/
```

#### Usuarios

Al momento de crear un usuario:

* La carga de **una imagen es opcional**.
* Se permite como máximo **1 imagen**.
* El campo utilizado para la imagen es `images`.

#### Productos

Al momento de crear o actualizar un producto:

* Se permite cargar hasta **5 imágenes**.
* Las imágenes son opcionales.
* El campo utilizado es `images`.

#### Tiendas

Al momento de crear o actualizar una tienda:

* Se permite cargar hasta **5 imágenes**.
* Las imágenes son opcionales.
* El campo utilizado es `images`.

---

### Documentos

Los documentos admitidos son exclusivamente archivos **PDF**.

Se almacenan en:

```text
uploads/documents/
```

#### Usuarios

Al momento de crear un usuario:

* La carga de **un documento es obligatoria**.
* Se permite como máximo **1 documento**.
* El documento debe ser un archivo **PDF**.
* El campo utilizado para el documento es `document`.

Por lo tanto, para crear correctamente un usuario se debe enviar obligatoriamente un documento PDF, mientras que la imagen es opcional.

---

### Comprobantes de pago

Los comprobantes de pago deben ser exclusivamente archivos **PDF**.

Se almacenan en:

```text
uploads/proof/
```

El comprobante se utiliza en las órdenes mediante el endpoint:

```text
PATCH /api/orders/:id/proof
```

El archivo debe enviarse mediante `multipart/form-data` utilizando el campo:

```text
proof
```

Cada orden mantiene asociado su comprobante de pago vigente.

La información del archivo se almacena en MongoDB, mientras que el archivo físico se conserva en:

```text
uploads/proof/
```

La información almacenada incluye:

* `originalName`
* `fileName`
* `path`
* `mimeType`
* `size`

---

## Resumen de límites de archivos

| Entidad  | Campo      | Tipo   |      Cantidad | Obligatorio     |
| -------- | ---------- | ------ | ------------: | --------------- |
| Usuario  | `images`   | Imagen |        Máx. 1 | No              |
| Usuario  | `document` | PDF    |        Máx. 1 | **Sí**          |
| Producto | `images`   | Imagen |        Máx. 5 | No              |
| Tienda   | `images`   | Imagen |        Máx. 5 | No              |
| Orden    | `proof`    | PDF    | 1 comprobante | Según operación |

### Tipos de archivo permitidos

**Imágenes:**

```text
image/jpeg
image/png
image/webp
image/gif
```

**Documentos y comprobantes:**

```text
application/pdf
```

La aplicación rechaza automáticamente los archivos que no cumplen con los tipos, cantidades o requisitos establecidos mediante el middleware de **Multer** y el sistema centralizado de manejo de errores.

---

## Límites de archivos

La configuración de Multer establece:

```text
Tamaño máximo por archivo: 5 MB
```

Para las cargas correspondientes a usuarios se controla además la cantidad máxima de archivos permitidos según el campo.

Por ejemplo:

* `images`: máximo 1 imagen.
* `document`: máximo 1 documento.
* `proof`: un comprobante por carga.

---

## Validación de archivos

Multer valida el tipo MIME de cada archivo.

### Imágenes permitidas

```text
image/jpeg
image/png
image/webp
image/gif
```

### Documentos y comprobantes permitidos

```text
application/pdf
```

Los archivos que no cumplen con los tipos permitidos son rechazados mediante el sistema centralizado de errores.

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
* Endpoints que utilizan `multipart/form-data`.
* Carga de archivos mediante Swagger.

---

# Acceso a Swagger

Una vez iniciado el servidor, la documentación puede consultarse en:

```text
http://localhost:8000/api/docs
```

---

# Configuración Swagger

Swagger fue implementado utilizando:

* `swagger-jsdoc` para generar la documentación desde comentarios JSDoc.
* `swagger-ui-express` para mostrar la interfaz gráfica.

La configuración se encuentra dentro de:

```text
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

Incluyen documentación de:

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

Incluyen documentación de:

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

Incluyen documentación de:

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

Incluyen documentación de:

* Comprador.
* Tienda asociada.
* Productos comprados.
* Dirección de entrega.
* Estado de la orden.
* Prioridad.
* Comprobante de pago.
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

Disponibles únicamente en entorno de desarrollo.

---

# Endpoints documentados en Swagger

## Usuarios

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
POST   /api/users/:id/documents
DELETE /api/users/:id
```

---

## Productos

```text
GET    /api/products
GET    /api/products/categories
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Tiendas

```text
GET    /api/stores
GET    /api/stores/:id
GET    /api/stores/owner/:ownerId
POST   /api/stores
PUT    /api/stores/:id
DELETE /api/stores/:id
```

---

## Órdenes

```text
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

```text
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

```text
ErrorResponse
```

Este schema es reutilizado por los endpoints de la API para documentar las respuestas de error.

La API implementa un sistema centralizado de manejo de errores mediante un middleware global, por lo que las respuestas mantienen una estructura consistente.

Ejemplo:

```json
{
    "status": "error",
    "message": "Datos de entrada inválidos",
    "error": "VALIDATION_ERROR"
}
```

---

# Manejo de errores

La API implementa un sistema centralizado de manejo de errores basado en:

* Factory `createError()`
* Diccionario `ERROR_DICTIONARY`
* Middleware global de errores `errorHandler`
* Función `apiErrorResponse()`

Todas las excepciones son procesadas por el middleware global, devolviendo una respuesta consistente para los diferentes endpoints.

## Errores implementados

### Errores generales

* `VALIDATION_ERROR`
* `CREATE_ERROR`
* `UPDATE_ERROR`
* `DELETE_ERROR`
* `GET_ERROR`
* `GET_ALL_ERROR`
* `DATABASE_ERROR`
* `ROUTE_NOT_FOUND`
* `INTERNAL_SERVER_ERROR`

### Recursos

* `USER_NOT_FOUND`
* `PRODUCT_NOT_FOUND`
* `STORE_NOT_FOUND`
* `ORDER_NOT_FOUND`
* `USER_ALREADY_EXISTS`

### Archivos

* `FILE_REQUIRED`
* `DOCUMENT_REQUIRED`
* `INVALID_DOCUMENT_TYPE`
* `INVALID_FILE_TYPE`
* `FILE_TOO_LARGE`
* `TOO_MANY_IMAGES`

Los errores relacionados con archivos permiten controlar archivos obligatorios, tipos no permitidos, tamaño máximo y cantidad de archivos.

---

# Logger

La aplicación utiliza **Winston** para registrar:

* Información.
* Advertencias.
* Errores.
* Solicitudes HTTP.

El logger se implementa mediante un middleware (`addLogger`), por lo que las peticiones son registradas automáticamente.

Además, el middleware global de manejo de errores registra el detalle de las excepciones para facilitar el diagnóstico y la depuración de la aplicación.

---

# Arquitectura

```text
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
│   ├── documents/
│   └── proof/
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

Contiene la configuración general de la aplicación, incluyendo la conexión a MongoDB y la configuración de Swagger.

### constants

Contiene las constantes utilizadas por la aplicación, como estados de órdenes, prioridades y roles.

### controllers

Reciben las peticiones HTTP y generan las respuestas correspondientes.

### middleware

Contiene middleware para:

* Logger.
* Manejo global de errores.
* Rutas inexistentes.
* Carga y validación de archivos mediante Multer.

### models

Contiene los modelos de Mongoose utilizados para representar las entidades de la aplicación.

### repositories

Contiene la lógica de acceso a la base de datos.

### services

Contiene la lógica de negocio y las validaciones de la aplicación.

### tests

Contiene las pruebas funcionales de la API utilizando:

* Mocha
* Chai
* Supertest

Los tests cubren los principales módulos y casos de error de la aplicación.

### routes

Contiene la definición de los endpoints de la API.

### utils

Contiene funciones auxiliares, respuestas de la API, Factory de errores y diccionario de errores.

### tools

Contiene scripts JavaScript utilizados por el frontend para la interacción con las vistas y el consumo de la API.

### uploads

Contiene los archivos cargados por la aplicación.

```text
uploads/
├── documents/
└── proof/
```

También se utiliza la carpeta principal `uploads/` para el almacenamiento de imágenes.

### views

Contiene las páginas HTML utilizadas por la aplicación.


---

# Docker

La aplicación está preparada para ejecutarse dentro de un contenedor Docker.

La imagen utiliza Node.js como imagen base y permite ejecutar la API en un entorno aislado, recibiendo las variables de entorno desde un archivo externo.

## Requisitos

Para ejecutar la aplicación con Docker es necesario tener instalado:

- Docker Desktop
- Git (para clonar el repositorio)

## Construir la imagen

Desde la raíz del proyecto, donde se encuentra el `Dockerfile`, ejecutar:

```bash         nombre de imagen . 
docker build -t shipnow-api .




# Funcionalidades

✔ CRUD completo de Usuarios

✔ CRUD completo de Productos

✔ CRUD completo de Tiendas

✔ CRUD completo de Órdenes

✔ Consulta de órdenes por comprador

✔ Consulta de órdenes por tienda

✔ Actualización del estado de las órdenes

✔ Actualización de la prioridad de las órdenes

✔ Carga y actualización de comprobantes de pago

✔ Carga y validación de archivos mediante Multer

✔ Validación de tipos de archivo

✔ Límite de tamaño de archivos

✔ Generación de datos Mock

✔ Manejo centralizado de errores

✔ Logger con Winston

✔ Validaciones de negocio

✔ Middleware global de errores

✔ Documentación interactiva con Swagger

✔ Pruebas funcionales con Mocha, Chai y Supertest

✔ Arquitectura por capas

---

# Autor

**Daniela Mabel Ponce Diomedi**

Proyecto desarrollado para el curso de Backend.
