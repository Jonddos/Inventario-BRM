# API Inventario - Prueba técnica (Backend Senior)

API REST desarrollada con **Node.js**, **Express**, **Sequelize** y **PostgreSQL** para gestionar:

- Registro y login de usuarios (roles: `ADMIN` y `CLIENT`)
- CRUD de productos de inventario (solo `ADMIN`)
- Módulo de compras para clientes
- Factura detallada por compra
- Historial de compras del cliente
- Vista de compras para administrador
- Logs, validaciones y manejo de errores

## 1. Requisitos

- Node.js >= 18
- PostgreSQL o MySQL
- npm

## 2. Instalación

```bash
git clone <TU_REPO>
cd inventario-api
npm install
```

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Edita las variables para apuntar a tu base de datos local.

## 3. Ejecución

```bash
npm run dev    # modo desarrollo (con nodemon)
# o
npm start      # producción
```

La API se expone en: `http://localhost:3000`

- Healthcheck: `GET /` → `{ message: "API Inventario funcionando" }`
- Rutas principales bajo `/api`

## 4. Modelos principales

- `User`:
  - `name`, `email`, `password (hash)`, `role (ADMIN|CLIENT)`
- `Product`:
  - `lote`, `nombre`, `precio`, `cantidad`, `fechaIngreso`
- `Purchase`:
  - `userId`, `total`, `createdAt`
- `PurchaseItem`:
  - `purchaseId`, `productId`, `cantidad`, `precioUnitario`

## 5. Endpoints principales

### Auth

- `POST /api/auth/register`
  ```json
  {
    "name": "Admin",
    "email": "admin@admin.com",
    "password": "123456",
    "role": "ADMIN"
  }
  ```

- `POST /api/auth/login`
  ```json
  {
    "email": "admin@admin.com",
    "password": "123456"
  }
  ```

  Respuesta:
  ```json
  {
    "token": "JWT_TOKEN",
    "user": { "id": 1, "name": "Admin", "email": "admin@admin.com", "role": "ADMIN" }
  }
  ```

Para el resto de endpoints, se debe enviar el header:

```http
Authorization: Bearer JWT_TOKEN
```

---

### Productos (ADMIN)

- `GET /api/products` → lista productos (cualquier usuario autenticado)
- `GET /api/products/:id` → detalle
- `POST /api/products` (solo ADMIN)
- `PUT /api/products/:id` (solo ADMIN)
- `DELETE /api/products/:id` (solo ADMIN)

Ejemplo `POST /api/products`:

```json
{
  "lote": "L-001",
  "nombre": "Teclado mecánico",
  "precio": 150000,
  "cantidad": 10,
  "fechaIngreso": "2025-11-13"
}
```

---

### Compras (CLIENT)

- `POST /api/purchases`
  ```json
  {
    "items": [
      { "productId": 1, "cantidad": 2 },
      { "productId": 3, "cantidad": 1 }
    ]
  }
  ```

- `GET /api/purchases/my` → historial del cliente autenticado
- `GET /api/purchases/:id/invoice` → factura detallada de una compra

### Compras (ADMIN)

- `GET /api/purchases/admin` → todas las compras con:
  - fecha de compra (`createdAt`)
  - cliente
  - productos comprados
  - cantidad por producto
  - precio total de la compra

## 6. Logs y errores

- Se utiliza **winston** para logs en `logs/combined.log` y `logs/error.log`
- Middleware global `errorHandler` para capturar y responder errores en formato JSON.

## 7. Mejoras sugeridas (bonus)

- Documentar endpoints con **apidoc** o Swagger
- Agregar tests (Jest / Supertest)
- Añadir paginación y filtros a productos y compras
- Manejo de permisos más granular
```
