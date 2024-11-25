FROM node:18-alpine as BUILD_IMAGE
WORKDIR /app/react-app

COPY package*.json .
 
RUN npm install --force

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev"]

# RUN npm run build

# #
# FROM node:18-alpine as PRODUCTION_IMAGE
# WORKDIR /app/react-app

# COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/ 


# COPY package.json .
# COPY vite.config.js .


