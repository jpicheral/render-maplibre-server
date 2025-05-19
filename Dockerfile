FROM node:18

# lib dependencies for maplibre-gl-native
RUN apt-get update && apt-get install -y \
  libgl1 \
  libc++1 \
  libc++abi1 \
  libx11-dev \
  libxcomposite-dev \
  libxcursor-dev \
  libxdamage-dev \
  libxi-dev \
  libxtst-dev \
  libnss3 \
  libxrandr-dev \
  libasound2 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install || (cat /root/.npm/_logs/* && false)


COPY . .

EXPOSE 3000

CMD ["npm", "start"]
