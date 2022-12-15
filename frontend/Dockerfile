FROM node as build
WORKDIR /app
COPY package.json .
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf


