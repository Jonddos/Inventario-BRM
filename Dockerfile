
# -----------------------------
# STAGE 1 – Build dependencias
# -----------------------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false

COPY . .

# -----------------------------
# STAGE 2 – Imagen final
# -----------------------------
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
