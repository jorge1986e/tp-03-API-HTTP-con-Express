const fs = require("node:fs/promises");

 //función asíncrona que lea un archivo

async function leerJson(ruta)

{
    const texto = await fs.readFile(ruta, "utf8");
    return JSON.parse(texto);
}

module.exports = { leerJson };

