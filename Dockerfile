# Estágio 1: Build da aplicação React
FROM node:20-alpine as build

WORKDIR /app

# Copia arquivos de dependência
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm install

# Copia o resto dos arquivos do projeto
COPY . .

# Aceita a variável de build do Coolify
ARG API_KEY

# Define como variável de ambiente para o Vite usar durante o build
ENV API_KEY=$API_KEY

# Gera os arquivos estáticos na pasta /dist
RUN npm run build

# Estágio 2: Servidor Web Nginx
FROM nginx:alpine

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no estágio anterior para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
