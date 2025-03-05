const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const lessMiddleware = require("less-middleware");
const cors = require("cors");
const routes = require("./routes");
const data = require(path.join(__dirname, "test.json"));
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
    const jsonData = {
    lead: [
        {
            alt: "desktop_prueba.jpg",
            image: {
                src: "https://caracoltv.brightspotcdn.com/dims4/default/7e51122/2147483647/strip/true/crop/5359x4097+0+2109/resize/1000x765!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2F6e%2Fc2%2F86e0c9bc4342ba876ac7ddd601c7%2Fdesktop-prueba.jpg",
                width: "1000",
                height: "765"
            },
            video: {
                src: "https://www.youtube.com/embed/T_QGUNF0CNA?si=KUQaTCXBqEGbE3G6",
                type: "video/mp4"
            }
        }
    ]
};

console.log("📌 JSON enviado a Handlebars:", JSON.stringify(jsonData, null, 2));

   
    
    // 👈 Verifica si `lead` tiene datos
    res.render("index",  jsonData );
});







// Rutas
app.use("/", routes);


// console.log("📌 JSON enviado a Handlebars:", data);

// console.log("📌 Imagen dentro de lead:", JSON.stringify(data.lead[0].image, null, 2));
// console.log("📌 Video dentro de lead:", JSON.stringify(data.lead[0].video, null, 2));


// app.get("/", (req, res) => {
//     res.render("index", data);
// });


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
