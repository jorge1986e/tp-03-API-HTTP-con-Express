const express = require(`express`);
const app = express();
const PORT = 3000;


app.get("/", (req, res)=>{
    res.send("api disponible");
});



















app.listen(PORT, ()=>{
console.log(`Servidor escuchando http://localhost:${PORT}`);

});

