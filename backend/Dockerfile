FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Устанавливаем зависимости
RUN npm сi
# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

FROM node:16-alpine as production
WORKDIR /app
# С помощью параметера --from указываем, что копировать нужно из образа builder
# Копируем package.json и package-lock.json (потребуются для установки зависимостей)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ecosystem.config.js ./
# Устанавливаем только зависимости, необходимые в продакшене
# --omit=dev означает пропустить dev-зависимости
RUN npm i --omit=dev && npm i pm2 -g
# Копируем директорию со сборкой приложения
COPY --from=builder /app/dist ./dist/
EXPOSE 3000
# Указываем команду для запуска приложения
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]