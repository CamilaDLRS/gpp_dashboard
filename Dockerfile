## ---------- Build Stage ----------
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps using clean environment; prefer npm ci if lockfile exists
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source (keep small context via .dockerignore)
COPY . .

# Build static assets
RUN npm run build

## ---------- Production Stage ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=builder /app/dist .

# Provide custom nginx config (ensure not excluded by .dockerignore)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]
