FROM mcr.microsoft.com/playwright:v1.59.1-jammy

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx playwright install --with-deps

COPY . .

CMD ["npx", "playwright", "test"]