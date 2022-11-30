FROM node
WORKDIR /app
COPY package-lock.json .
COPY ./package.json .
RUN npm ci --only=production
COPY . . 
CMD npm run start