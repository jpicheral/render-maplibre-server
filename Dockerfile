FROM node:18

# lib dependencies for maplibre-gl-native
RUN apt-get update && apt-get install -y \
  libgl1 \
  libc++1 \
  libc++abi1 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
