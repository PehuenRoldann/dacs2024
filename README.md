## Configuración entorno de desarrollo front
Requisitos:
- Docker (desktop o engine)
- Docker Compose
- Node 18.10
- Angular 16

### Iniciar KEYCLOAK y Nginx
Teniendo Docker (desktop o engine) corriendo, y Docker Compose instalado (generalmente viene incluido en Docker Desktop, pero no con el engine),
úbicarse en el directorio donde se encuentra el archivo docker-comopse.yml e iniciar los contenedores utilizando el comando **docker compose up -d**,
es posible iniciar el contendor de keycloak (y no el nginx) cuando desarrollas utilizando el servidor de pruebas de Angular, en ese caso utilizar
**docker compose up -d keycloak**.
Con el contenedor de keycloak iniciado, se debería crear el **realm** automáticamente utilizando el archivo realm-conf-urbancheck.json (esto puede demorar),
Por defecto se va a mapear el puerto 8080 del contenedor con el 8888 del host, por lo que podemos acceder a la consola de administración de keycloak para
comprobar que todo se creó correctamente utilizando la dirección localhost:8888.
Por defecto: user = ADMIN y password = ADMIN.

Si el realm se creó correctamente, sigue ejecutar el servidor de pruebas de angular.
Hay que bajar las dependencias utilizando **npm init**.
Podes correr el servidor con **npm run start** estando parado en el directorio **urbancheck-front-app/**.
Para poder utilizar la api de mapbox, vas a necesitar agregar una key/token que genera mapbox al crarte una cuenta.
Teniedo la key, hay que agregarla en el archivo ***urbancheck-front-app/src/environments/environment.localhost.ts***.

Ahora si podes iniciar el servidor y al logearte con keycloak (tenes que registrarte si acabas de crear el contenedor) debería mostrase la app web con el mapa
interactivo.
