# Stage 1: Build ?ng d?ng
FROM node:18-slim as BUILD_IMAGE

# Cài d?t các công c? c?n thi?t
RUN apt-get update && apt-get install -y python3 make g++ && apt-get clean

WORKDIR /app

# Sao chép package.json và cài d?t dependencies
COPY package*.json ./
RUN npm install --force

# Cài d?t terser d? h? tr? Vite build


# Sao chép toàn b? mã ngu?n
COPY . .

# Build ?ng d?ng v?i b? nh? t?i uu
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Stage 2: Serve ?ng d?ng
FROM node:18-slim as SERVE_IMAGE

WORKDIR /app
COPY --from=BUILD_IMAGE /app/dist ./dist

# Cài d?t serve d? ch?y ?ng d?ng
RUN npm install -g serve


EXPOSE 5173

# Ch?y server
CMD ["serve", "-s", "dist", "-l", "5173"]
