FROM node:14-alpine
WORKDIR /wsky-back-app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
