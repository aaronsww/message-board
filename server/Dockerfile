FROM node:lts
WORKDIR /server
COPY . .
RUN npm install
EXPOSE 5000
ENV $(cat .env | xargs)
CMD ["node", "index.js"]