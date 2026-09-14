# Trabajo práctico 03
Alumno: Chocobar Jorge
## Descripción
Este tp pedia realizar una api de instrumentos musicales donde se puede conmsultar la lista de los instrumentos y tambien consultar por id, Creación en memoria mediante post utilise postman para enviar los nuevos instrumentos con el metodo POST y consultar con el metodo GET.

## Instalación e Ejecución

Para iniciar el proyecto necesita instalar las depencias con:
- npm install.

luego para iniciar tiene configurado scripts": "start" en la ubicacion src/index.js
- npm start

## Endpoints

1. Ruta Raíz (GET /)
Página de bienvenida de la API.

Si alguien entra a la raíz del servidor, responde con un código 200 (OK) y un mensaje JSON confirmando que la API de Instrumentos Musicales está activa.

2. Obtener / Filtrar Instrumentos (GET /api/instrumentos)
Devuelve una lista de instrumentos, con la opción de filtrarlos.

Si no le pasas parámetros, devuelve todos los instrumentos disponibles.

Si usas un parámetro de consulta (ej. ?familia=cuerdas), filtra la lista ignorando mayúsculas/minúsculas y devuelve solo los que coincidan.

3. Buscar por id (GET /api/instrumentos/:id)
Busca un instrumento específico por su número de identificación.

Captura el id de la URL, lo busca en el arreglo y Si lo encuentra, responde con un 200 (OK) y los datos del instrumento.

Si no existe, devuelve un error 404 (instrumento no encontrado).

4. Crear Instrumento (POST /api/instrumentos)
Agrega un nuevo instrumento a la lista.

Primero valida que todos los datos obligatorios estén presentes en el cuerpo (req.body). Si falta alguno, responde con un 400 (faltan datos obligatorios).

Si está completo, calcula automáticamente un nuevo ID sumándole 1 al último existente, lo guarda en el arreglo y responde con un 201 (Created) junto al objeto creado.

## Ejemplos de solicitudes

Ruta raiz  http://localhost:3000/ 

Ruta instrumentos  http://localhost:3000/api/instrumentos

Ruta buscar por familia http://localhost:3000/api/instrumentos?familia=Cuerda

ruta buscar por ID http://localhost:3000/api/instrumentos/1

Creacion de nuevos intrumetos: http://localhost:3000/api/instrumentos
utilizando postman POST:

    {
    "nombre": "violin",
    "familia": "Cuerda",
    "origen": "italia",
    "descripcion": "Pequeño instrumento de cuerda.",
    "disponible": true
    }


## Códigos de estado

| Caso | Solicitud | Estado esperado |
| :--- | :--- | :--- |
| Bienvenida | `GET /` | 200 |
| Listado | `GET /api/instrumentos` | 200 |
| Filtro con coincidencias | `GET /api/instrumentos?familia=...` | 200 |
| Filtro sin coincidencias | `GET /api/instrumentos?familia=inexistente` | 200 |
| Detalle existente | `GET /api/instrumentos/1` | 200 |
| Detalle inexistente | `GET /api/instrumentos/999` | 404 |
| Creación válida | `POST /api/instrumentos` | 201 |
| Creación sin nombre | `POST /api/instrumentos` | 400 |
| Creación con `disponible: false` | `POST /api/instrumentos` | 201 |


## Persistencia de los datos

Los datos se cargan desde el archivo JSON únicamente al iniciar el servidor (const instrumentos = await leerJson(db);).  Cuando se realiza una petición POST, el nuevo instrumento se agrega solo al arreglo en la memoria RAM mediante instrumentos.push(nuevoInstrumento).  Como el código no incluye una función para escribir los cambios de vuelta en el archivo físico, los datos nuevos no persisten si se detiene y vuelves a iniciar el servidor, esos registros se perderán. 

## Debe explicar:
```
npm install y npm start:  npm install carga las dependecias necesarias que lee del package-lock.json y npm start se utiliza para inicir el proyecto previamente configurado el scripts en package.json.
-------------------------------------------
Cómo detener el servidor: el servidor iniciado se detiene con: CONTROL + C
-------------------------------------------
Método y URL de cada endpoint: 

Metodo GET http://localhost:3000/ 

Metodo GET http://localhost:3000/api/instrumentos

Metodo GET http://localhost:3000/api/instrumentos?familia=Cuerda

Metodo GET http://localhost:3000/api/instrumentos/1

Metodo POST http://localhost:3000/api/instrumentos

-------------------------------------------

Cuerpo necesario para POST: app.use(express.json()); // Necesario para interpretar JSON

-------------------------------------------

Casos 200 , 201 , 400 y 404:
1. 200 OK (Éxito)
2. 201 Created (Creado con éxito)
3. 400 Bad Request (Solicitud incorrecta - Error del cliente)
4. 404 Not Found (No encontrado)
-------------------------------------------
Diferencia entre parámetro de ruta y consulta:
La diferencia principal entre un parámetro de ruta y un parámetro de consulta (query) radica en dónde se ubican en la URL y para qué propósito se utilizan al diseñar una API REST.

1. Parámetros de Ruta (req.params)
Qué son: Son fragmentos obligatorios que forman parte de la estructura de la URL. Se definen en Express anteponiendo dos puntos (:).

Para qué se usan: Para identificar un recurso específico (generalmente buscando por su ID único en la base de datos).

Ejemplo de URL: GET /api/instrumentos/64a1b2c3d4e5f6

2. Parámetros de Consulta o Query (req.query)
Qué son: Son pares de clave-valor que se colocan al final de la URL, separados por un signo de interrogación (?) y unidos por un ampersand (&).

Para qué se usan: Son opcionales y se emplean principalmente para filtrar, ordenar, buscar o paginar listados de elementos.
-------------------------------------------
Función de express.json(): La función express.json() es un middleware integrado en Express que se encarga de analizar (o parsear) las peticiones HTTP entrantes que tienen un cuerpo en formato JSON (Content-Type: application/json).
-------------------------------------------
Por qué las creaciones desaparecen al reiniciar: Porque los datos se conservan solamente en memoria.

```