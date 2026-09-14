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

//    -----------------------busca x id     //

app.get("/api/instrumentos/:id", (req, res)=>{
    const id = Number(req.params.id);
    const instrumento = instrumentos.find((elemento) => elemento.id === id);
    if (!instrumento) 
        {
            return res.status(404).json({error: "instrumento no encontrado"})   
        }
        res.status(200).json(instrumento);
    });
    
    //    -----------------------POST     //

app.post("/api/instrumentos", (req, res) =>{
const { nombre, familia, origen, descripcion, disponible } = req.body;

if (!nombre || !familia || !origen || !descripcion || disponible === undefined) {
    return res.status(400).json({error: "faltan datos obligatorios"});
}

const ultimoId = instrumentos.length === 0 ? 0 : instrumentos[instrumentos.length -1].id;
const nuevoInstrumento = {
id: ultimoId + 1,
nombre,
familia,
origen,
descripcion,
disponible,};

instrumentos.push(nuevoInstrumento);
res.status(201).json(nuevoInstrumento);

});

    app.listen(PORT, ()=>{
    console.log(`Servidor escuchando http://localhost:${PORT}`);});

}    

main();




