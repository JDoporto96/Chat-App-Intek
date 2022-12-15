FROM node
WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm ci --only=production
COPY . . 
CMD ["npm", "start"]
