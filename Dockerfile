# Stage 1: Build
FROM node:18-alpine as BUILD_IMAGE

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build dự án
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine as SERVE_IMAGE

# Set working directory
WORKDIR /app

# Copy từ bước build
COPY --from=BUILD_IMAGE /app/dist ./dist

# Cài đặt một trình phục vụ đơn giản
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Command để chạy server
CMD ["serve", "-s", "dist", "-l", "5173"]
