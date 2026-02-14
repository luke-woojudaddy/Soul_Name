FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# 로컬 개발 시에는 override에서 command를 덮어씌우므로 이 줄은 무시되거나 캐싱됨
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
