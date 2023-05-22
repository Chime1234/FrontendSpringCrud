FROM node:20.1-alpine3.16

WORKDIR /my-app
    
ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

CMD ["npm", "start"]
