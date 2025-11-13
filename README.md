# Inventario API

API REST desarrollada con **Node.js**, **Express**, **Sequelize**, **Swagger**, y **PostgreSQL**, construida bajo una arquitectura escalable y mantenible.  
Incluye autenticación JWT, control de roles, facturación con consecutivo, validaciones, logs y contenedores Docker listos para ejecutar en cualquier entorno.

## Índice

1. Descripción General  
2. Características Principales  
3. Tecnologías  
4. Arquitectura del Proyecto  
5. Instalación (Docker – Recomendado)  
6. Instalación Manual (Opcional)  
7. Variables de Entorno  
8. Ejecución del Proyecto  
9. Modelos Principales  
10. Autenticación y Roles  
11. Documentación API (Swagger)  
12. Colección Postman  
13. Flujo de Compra y Facturación  
14. Permisos por Rol  
15. Pruebas Sugeridas  

---

##  Descripción General

Este proyecto implementa un sistema completo de inventario, compras y facturación con roles:

-  **ADMIN**  
  - CRUD de productos  
  - Visualización de compras  
  - Acceso a todas las facturas  

-  **CLIENT**  
  - Puede realizar compras  
  - Ver su propio historial  
  - Acceder a sus facturas  
  - *No puede administrar productos*  

---

## Características Principales

- Autenticación JWT  
- Roles (ADMIN / CLIENT)  
- CRUD de productos  
- Módulo de compras  
- Factura automática en BD con consecutivo  
- Historial de compras  
- Panel de compras para Admin  
- Validaciones con Joi  
- Logs con Winston  
- Swagger UI  
- Docker + docker-compose  
- Postman Collection incluida  

---

## Tecnologías

| Componente | Tecnología |
|-----------|------------|
| Backend | Node.js + Express |
| Base de Datos | PostgreSQL |
| ORM | Sequelize |
| Documentación | Swagger 3.0 |
| Autenticación | JWT |
| Validaciones | Joi |
| Logs | Winston |
| Contenedores | Docker y docker-compose |

---

## Arquitectura del Proyecto

```
/inventario-api
│── Dockerfile
│── docker-compose.yml
│── package.json
│── server.js
│── /src
│   ├── /config
│   ├── /controllers
│   ├── /middlewares
│   ├── /models
│   ├── /routes
│   ├── /utils
│   └── app.js
│── postman_collection.json
│── README.md
```

---

##  Instalación (Docker – Recomendado)

###  Clonar el repositorio
```bash
  git clone https://github.com/Jonddos/Inventario-BRM.git
  cd inventario-api
```

### Construir y levantar servicios

```bash
  docker compose up -d --build
```

Servicios:

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| inventario-api | 3000 | API REST |
| inventario-db | 5432 | PostgreSQL |

### Ver logs

```bash
  docker compose logs -f api
```

### Apagar servicios

```bash
  docker compose down
```

---

##  Instalación Manual (Opcional)

Requiere:

- Node.js >= 18  
- PostgreSQL  

Instalar dependencias:

```bash
  npm install
```

Ejecutar en desarrollo:

```bash
  npm run dev
```

---


## ▶ Ejecución del Proyecto

Con Docker:  
 http://localhost:3000/api

Con Node:  
```bash
  npm run dev
```

---

##  Modelos Principales

###  User
- name  
- email  
- password  
- role (ADMIN | CLIENT)

###  Product
- lote  
- nombre  
- precio  
- cantidad  
- fechaIngreso  

###  Purchase
- userId  
- total  
- createdAt  

###  Invoice
- number (FAC-00001)  
- purchaseId  
- userId  
- total  

###  PurchaseItem
- cantidad  
- precioUnitario  
- productId  
- purchaseId  

---

##  Autenticación y Roles

### Login
```http
POST /api/auth/login
```

### Usar token
```
Authorization: Bearer <JWT>
```

---

##  Documentación API (Swagger)

Disponible en:

👉 http://localhost:3000/api-docs

Incluye todos los endpoints documentados, ejemplos y esquemas.

---

## Colección Postman

Incluida en el archivo:

```
postman_collection.json
```

Variables:

```
{{base_url}} = http://localhost:3000/api
{{token}}
```

---

##  Flujo de Compra y Facturación

1. Cliente realiza compra  
2. Validación de inventario  
3. Creación de Purchase  
4. Descuento automático de stock  
5. Generación de factura en BD  
6. Consecutivo automático: FAC-00001  
7. Visualización con `/purchases/:id/invoice`  

---

## Permisos por Rol

| Acción | CLIENT | ADMIN |
|--------|--------|--------|
| Registrar | ✔ | ✔ |
| Login | ✔ | ✔ |
| Crear producto | ❌ | ✔ |
| Actualizar producto | ❌ | ✔ |
| Eliminar producto | ❌ | ✔ |
| Ver productos | ✔ | ✔ |
| Comprar | ✔ | ❌ |
| Ver su historial | ✔ | ❌ |
| Ver todas las compras | ❌ | ✔ |
| Ver factura | ✔ (solo suya) | ✔ (todas) |

---

##  Pruebas Sugeridas

- Login correcto / incorrecto  
- CRUD productos como Admin  
- Intentos de compra siendo Admin (debe fallar)  
- Flujo completo de compra  
- Generación de factura  
- Acceso a facturas según rol  
- Validaciones Joi  
- Swagger funcionando  

---

