# --- Giai đoạn 1: Build code ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy file package để cài thư viện
COPY package.json package-lock.json ./

# Cài đặt dependency
RUN npm install

# Copy toàn bộ code vào
COPY . .

# Chạy lệnh build (sẽ tạo ra thư mục 'dist')
RUN npm run build

# --- Giai đoạn 2: Chạy với Nginx ---
FROM nginx:alpine AS production

# Copy file cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy kết quả build từ giai đoạn 1 sang thư mục web của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]