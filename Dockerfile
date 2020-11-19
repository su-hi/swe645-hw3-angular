# Khadija Kobra
# G01120432
# Arnab Debnath
# G01120433
# Docker configuration

FROM node:12.16.1-alpine As builder

WORKDIR /opt/ng

COPY package.json package-lock.json ./

RUN npm install

COPY . .

#RUN npm install -g @angular/cli

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /opt/ng/dist/hw3/ /usr/share/nginx/html