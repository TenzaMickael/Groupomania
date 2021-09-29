// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');

// On importe le paquage "fs" pour gérer les images  
const fs = require('fs');


/* ***** Création d'un utilisateur ***** */ 
exports.createUser = (req, res, next) => {
    
    let filename = "";
    if (req.file) {
        filename = req.file.filename;
    }

    connection.query('INSERT into users (pseudo,profil_picture,email,password,create_at) VALUES (?,?,?,?,now())', [req.body.pseudo, filename, req.body.email,req.body.password],
        function (err, results) {
            if (err) {
                res.status(500).json({message:"Utilisateur non crée"} )
            }
            res.status(201).json({message:"Utilisateur crée"});
        })
};

/* ***** Modification d'un utilisateur ***** */
/*exports.modifyUser = (req, res, next) => {

    connection.query (' select * from users where id = ?'),[req.params.id],
    function (err,results) {
        if (results.length === 0){
            res.status(500).json({message:"erreur 500"})
        }

        const user = results[0]
        if (user.profil_picture)
    }
}*/