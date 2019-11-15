FROM node:10.17-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]

#docker run -detach -p <host port>:8080 --network <your docker network> 
# --env FIREBASE_WEB_API_KEY=<your API key here> --env PORT=8080 
# --name firebase-auth --restart unless-stopped 
# <your firebase-auth docker image here>