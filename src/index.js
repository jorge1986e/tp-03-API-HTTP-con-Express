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
        res.status(200).json({mensaje:"Bienvenido a la API de Instrumentos Musicales"});
    });
//    -----------------------busca por familia      //

    app.get("/api/instrumentos", (req, res)=>{
        const { familia } = req.query;
        if (!familia) 
        {
         return res.json(instrumentos)
        }
        const resultado = instrumentos.filter(
        (instrumentos)=> instrumentos.familia?.toLowerCase() === String(familia).toLowerCase())
        res.json(resultado);
    });

//    -----------------------     //

app.get("/api/instrumentos/:id", (req, res)=>{
    const id = Number(req.params.id);
    const instrumento = instrumentos.find((elemento) => elemento.id === id);
    if (!instrumento) 
    {
     return res.status(404).json({error: "instrumento no encontrado"})   
    }
    res.status(200).json(instrumento);
});

    app.listen(PORT, ()=>{
    console.log(`Servidor escuchando http://localhost:${PORT}`);});

}    

main();




