
/* ***** CONTROLLEUR ADMIN.JS ***** */


// On importe le middleware "connect.bdd.js" 
const connection = require('../middleware/connect.bdd');


// On importe le package "bcrypt"
const bcrypt = require('bcrypt');


// On utilise "dotenv" pour récupérer les identifiant de mysql 
require('dotenv').config();


/* ***** Création d'un users *****  */

exports.addUser = (req,res,next) => {

//Cryptage de l'email avec une chaine de caractère
    const emailHash = Buffer.from(req.body.email).toString('hex');
   
//Cryptage du password 
    bcrypt.hash(req.body.password, 10)

    .then(hash => {

        connection.query('insert into  users (pseudo, email, password ,create_at) values (?,?,?,now())', [req.body.pseudo, emailHash, hash],
        function(err, results) {

            if (err) {

                return res.status(500).json({message:"Utilisateur non crée" , results})

            }else{

                return res.status(201).json({message:"Utilisateur crée" , results });
            }
        })
    })

    .catch(error => res.status(400).json({ error }));
};


/* ***** Suppression d'un utilisateur ***** */

exports.deleteUsers = (req, res, next) => {

    connection.query('delete from users where id = ?',[req.body.id],

        function (err, results) {

            if (results.affectedRows == 0) {

                return res.status(500).json({message:"Utilisateur non supprimé" , error:err});

            }else {

                return res.status(200).json({message:"Utilisateur supprimer" , results});
            }
        })
};


/* ***** Suppression d'un commentaire  ***** */

exports.deleteComments = (req, res, next) => {

    connection.query('delete from comments where id = ?',[req.body.id],

        function (err, results) {

            if (results.affectedRows == 0) {

                return res.status(500).json({message:"Commentaire non supprimé" , error:err});
 
            }else{

                return res.status(200).json({message:"Commentaire supprimer" , results});

            }
        })
};


/* ***** Suppression d'un post ***** */

exports.deletePosts = (req, res, next) => {

    connection.query('delete from posts where id = ? ',[req.body.id],

        function (err, results) {

            if (results.affectedRows == 0) {

                return res.status(500).json({message:"Post non supprimé" , error:err});

            }else {

                return res.status(200).json({message:"Post supprimer" , results});
            }
        })
};
    






