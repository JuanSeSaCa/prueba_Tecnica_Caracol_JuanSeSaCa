const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const lessMiddleware = require("less-middleware");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;
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

// Rutas
app.use("/", routes);

// Middleware para parsear JSON
app.use(express.json());

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
