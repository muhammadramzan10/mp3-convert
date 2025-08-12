FROM node:20-bullseye

RUN apt-get update \
  && apt-get install -y ffmpeg python3 python3-pip ca-certificates \
  && pip3 install -U yt-dlp \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
