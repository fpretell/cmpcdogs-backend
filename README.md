<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# CMPC DOG API

1. Clonar proyecto
2. ```npm install```
3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```
4. Cambiar las variables de entorno
5. Aegurarse de tener instalado docker y docker compose.
6. Levantar la base de datos
```
docker-compose up -d
```
7. Aegurarse de tener el puerto 5432 libre.
8. Asegurarse de tener node 20. Versiones usadas:  Node(v20.12.2) y Npm (v10.5.0)
9. Levantar: ```npm run start:dev```
10. Ejecutar el Seed, para insertar datos en la BD: GET http://localhost:3000/api/seed/
11. Conectar al servidor Postgres a traves de algun Aplicativo como pgAdmin 4.
12. Diagrama ER: https://drive.google.com/file/d/1J2wvEgmq-jgOaMPPDpteAMldk87AmvM3/view?usp=drive_link

