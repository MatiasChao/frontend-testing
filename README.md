## Correr los Proyectos

### `Frontend (pedidos) - ReactJS`

.) Para poder correr el Front en React debemos:
 1) clonar este repo ( https://github.com/MatiasChao/pedidos.git )
 2) instalar las dependencias ( npm install )
 3) npm start 
 4) va a ejecutarse en el puerto 3000
    http://localhost:3000/login

  **Notas**
  En el archivo "credentials.js" necesitamos configurar las siguientes variables:
    
    .) En este archvio le tenemos que pasar el mapKey de GoogleMaps, les dejo mi key así lo pueden probar para que no tengan que generarse una nueva.
        mapsKey: 'AIzaSyA9jI7cmDJiM2q7R_Q2aoG7olcptC345UA'

### `Backend (backend) - NodeJS + Express + MongoDB`

.) Para poder correr el Backend en NodeJS debemos:
  1) clonar el repo ( https://github.com/MatiasChao/backend.git )
  2) instalar las dependencias ( npm install )
  3) node .
  4) va a estar corriendo en el puerto 4000 por defecto

**Notas**
  En el archivo "variables.env" necesitamos configurar las siguientes variables:
   
    .) Donde tenemos alojada al base de datos (creé un cluster con una base de datos en Mongo) lo dejó configurado para que puedan acceder sin problema desde      cualquier ip.
    
    .) Agregar los parametros de "clientId" y "clientSecret" que me dan


### `Uso del Stack`
**Frontend**
Elegí `React` dado que es muy rápido para el procesamiento de datos y tiene la gran ventaja de usar el VirtualDOM, así no tenemos que renderizar toda la página al cambiar algunos componentes.

**Backend**
Use `Node + Express` porque es especialmente bueno para aplicaciones realtime que necesitan mantener una conexión persistente entre el browser y el servidor.
También nos permite expandir nuestro código añadiendo módulos de forma fácil gracias al Node Package Manager (NPM)

**Database**
La base está en `MongoDB` dado que al ser una base de datos no relacional me reflexibiliza la escalabilidad del proyecto.

### `Admin`
**Cantidad de usuarios logueados**

GET / http://localhost:4000/api/admin/users

Cuando un usuario inicia sesión lo guardo en ddl de la Base de Datos. Ese ddl puede ser una cantidad de tiempo x que le pasemos.
Al llegar al tiempo dado se va a eliminar solo el registro, sino cuando cierra sesión se elimina el usuario de la base.


### `Pendientes / Mejoras`
1) Para las busquedas con las mismas coordenadas en menos de un minuto lo qué haría sería guardarla en una tabla con TTL de 1 min, al hacer una búsqueda chequeó primero en la tabla y si no lo encuentro hago una nueva busqueda.

2) Mejoras en validaciones. Agregaría Test Unitarios

3) Terminar el Paginado (no quedó al 100%)

4) Guardar makers de cada buscado restaurante en el Mapa. Guardaría las busquedas en memoría y los mostraría en el GoolgeMaps

