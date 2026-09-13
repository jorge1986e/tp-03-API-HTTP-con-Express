const express = require(`express`);
const path = require("node:path");
const { leerJson } = require("./archivos");
const PORT = 3000;
const db = path.join(__dirname, "..", "datos", "instrumentos.json");



async function main() 
{
    const instrumentos = await leerJson(db);
    const app = express();
    app.use(express.json());

    app.get("/", (req, res)=>{
        res.json({ mensaje:"Bienvenido a la API de Instrumentos Musicales"});
    });
//    -----------------------      //

    app.get("/api/instrumentos", (req, res)=>{
        const { familia } = req.query;
        if (!familia) 
        {
         return res.json(instrumentos)
        }
        const resultado = instrumentos.filter(
        (instrumentos)=> instrumentos.familia.toLowerCase() === String(familia).toLowelCase(),)
        res.json(resultado);
    });

    
    app.listen(PORT, ()=>{
    console.log(`Servidor escuchando http://localhost:${PORT}`);});

}    

main();




