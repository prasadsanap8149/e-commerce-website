FROM node:18-alpine

WORKDIR /app

COPY ecommerce-frontend/package*.json ./

RUN npm install

COPY ecommerce-frontend/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
