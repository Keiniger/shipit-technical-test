# Prueba Técnica Desarrollador Shipit

Se puede ver la versión deployeada [aqui](https://shipit-client.onrender.com/)

Para correr el backend basta con ejecutar los comandos:

```
cd server
npm install
docker compose up
```

Para correr el fronend, en cambio, debemos ejecutar los comandos:

```
cd client
npm install
npm run start
```

Luego, se debe correr :

```
npm run db:migrate
```

Y para rellenar los destinos:

```
npm run db:populate-destinies
```

Pedir por privado las variables de entorno de .env

## Problemática

Debemos generar envíos con ciertos datos, para ello, dejamos más abajo toda la información necesaria para llevar a cabo este objetivo.

Para llevar a cabo lo mencionado anteriormente, necesitamos cumplir algunos pre-requisitos, como conocer los orígenes, destinos, poder cotizar el costo de envío hacia un x destino e implementar una interfaz gráfica que nos permita interactuar con todas estas aristas para que finalmente, podamos guardar el registro del envío generado con todos los datos y validaciones necesarias, todo esto se encuentra explicado a detalle más abajo.
