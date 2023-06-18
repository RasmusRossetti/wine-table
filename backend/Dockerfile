FROM node:14-alpine
WORKDIR /app/backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/server.js"]
