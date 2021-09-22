// On importe les module express et cors 
const express = require("express");
const cors = require("cors");


// On crée une application express
const app = express();


// On définit le port d'écoute par défaut
var corsOptions = {
  origin: "http://localhost:8081"
};


//On utilise la methode app.use 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// On importe le dossier "models"
const db = require("./app/models");


//On supprime les table existante et on resynchronise le base de donnée 
db.sequelize.sync({ force: true }).then(() => {
    console.log("efface et resynchronise la base de donnée");
});
  


// Test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


//Écoute sur le port 8080 pour les requetes entrantes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
