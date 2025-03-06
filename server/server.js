const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const lessMiddleware = require("less-middleware");
const cors = require("cors");
const routes = require("./routes");
const data = require(path.join(__dirname, "../data/test.json"));
const app = express();
const PORT = process.env.PORT || 3000;



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






app.get("/", (req, res) => {
    // console.log("📌 JSON enviado a Handlebars:", JSON.stringify(data, null, 2));
    res.render("index", data);
  });





// Rutas
app.use("/api", routes);


// console.log("📌 JSON enviado a Handlebars:", data);

// console.log("📌 Imagen dentro de lead:", JSON.stringify(data.lead[0].image, null, 2));
// console.log("📌 Video dentro de lead:", JSON.stringify(data.lead[0].video, null, 2));



// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
