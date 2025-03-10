const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const lessMiddleware = require("less-middleware");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require("fs");


// ✅ Servir la carpeta /data como archivos públicos
app.use("/data", express.static(path.join(__dirname, "../data")));


//  Importar el JSON correctamente
// const data = require(path.join(__dirname, "../data/test.json"));

// Verificar si el archivo se está cargando correctamente
//console.log(" JSON cargado correctamente:", data);



// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Middleware para compilar LESS a CSS
app.use(
  lessMiddleware(path.join(__dirname, "../src/public/less"), {
    dest: path.join(__dirname, "../src/public/css"),
    force: true
   
  })
);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../src/public")));

// Configurar Handlebars
app.engine(
    "hbs",
    exphbs.engine({
      extname: ".hbs",
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "../src/templates/layouts"),
      partialsDir: path.join(__dirname, "../src/templates/partials"),
    })
  );

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../src/templates"));



// Cargar los datos desde test.json
const rawData = fs.readFileSync(path.join(__dirname, "../data/test.json"));
const jsonData = JSON.parse(rawData);

// Ruta para la API de datos
app.get("/api/data", (req, res) => {
  res.json(jsonData);
});

// Ruta para renderizar la página con los datos
app.get("/", (req, res) => {

// console.log("jsonData recibido en la ruta /:", jsonData);
//   console.log("Contenido de jsonData.lead:", jsonData.lead);

  res.render("index", jsonData); // Aquí pasamos los datos a Handlebars
});


// Rutas
app.use("/", routes);


// console.log("📌 JSON enviado a Handlebars:", data);

// console.log("📌 Imagen dentro de lead:", JSON.stringify(data.lead[0].image, null, 2));
// console.log("📌 Video dentro de lead:", JSON.stringify(data.lead[0].video, null, 2));



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
