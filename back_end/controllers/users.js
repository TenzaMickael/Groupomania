// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config();


/* ***** Création d'un utilisateur ***** */ 
exports.createUser = (req, res, next) => { 
    
    const emailHash = Buffer.from(req.body.email).toString('hex');
    bcrypt.hash(req.body.password, 10)
    
    .then(hash => {

        connection.query('insert into  users (pseudo, email, password ,create_at) VALUES(?,?,?,now())', [req.body.pseudo, emailHash,hash],

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


/* ***** Modification d'un utilisateur ***** */
exports.modifyUser = (req, res, next) => {

    const token = req.headers.authorization.split('')[1];
    const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    connection.query ('update users set pseudo=?,email=?,password=? where id=?', [req.body.pseudo, req.body.email, req.body.password,userId],

        function (err,results) {

            if (results.affectedRows == 0 ||! results.insertId == req.params.user_id){

                return res.status(500).json({message:"utilisateur non modifié" , error:err})

            }else{

                return res.status(200).json({ message:"utilisateurs modifié" , results});

            }
        })
    
    
};


/* ***** Suppression d'un utilisateur ***** */
exports.deleteUser = (req, res, next) => {

    connection.query('delete from users where id = ?',[req.params.id],

        function (err, results) {

            if (results.affectedRows == 0 ||! results.insertId == req.params.user_id) {

                return res.status(500).json({message:"Utilisateur non supprimé" , error:err})

            }else {

                return res.status(200).json({message:"Utilisateur supprimer" , results})
            }
        })
}


/* ***** Recherche de tout les utilisateurs ***** */ 
exports.getAllUsers = (req, res, next) => {

    connection.query('select * from users' ,

        function (err, results) {

            if (results.length ===0) {

                return res.status(404).json({message:"Aucun utilisateurs" , error:err})

            }else { 

                return res.status(200).json({message:"Utilisateurs trouvé " , results})
            }
        });
}


/* ***** Recherche d'un utilisateur ***** */
  exports.getOneUser = (req, res, next) => {

   connection.query('select * from users where id = ?', [req.params.id],

        function(err, results) {

            if (results.length === 0) {

                return res.status(404).json({message:"Utilisateur non trouvé" , error:err}) 
                
            }else{

                return res.status(200).json({message:"utilisateur trouvé", results})
                            
            }
        }

)}
 

