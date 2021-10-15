// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


require('dotenv').config();


/* Connection  */
exports.signup = (req,res,next) => {

    const emailHash = Buffer.from(req.body.email).toString('hex');
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


/* ***** Connection d'un utilisateur ***** */
exports.login = (req, res, next) => {
    const emailHash = Buffer.from(req.body.email).toString('hex');
    bcrypt.hash(req.body.password, 10)

    connection.query('select * from users where email = ?', [emailHash],

        function(err, results) {
          
            if (results.length === 0) {
                
                 return res.status(404).json({message: "L'utilisateur n'existe pas" , error:err}) 
                
            }
            console.log('password', req.body.password);
            console.log('passwordUser', results[0].password);

                bcrypt.compare(req.body.password, results[0].password)
               
                .then(valid => {
                    console.log('valid', valid)
                    
                    if(!valid) {
                        return res.status(500).json({    message: "L'utilisateur et le mot de passe ne correspondent pas"})
                    }

                    console.log('id', results[0].id);

                    res.status(200).json({ 
                        message: 'Login effectué, vous allez être redirigé ',
                         token: jwt.sign(
                            { userId: results[0].id, userAdmin: results[0].admin },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h'}
                        ), 
                        userId: results[0].id
                    });  
                
                })
                .catch(() => {
                    return res.status(500).json({message:"Une erreur s'est produite"});       
                })
            
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





/* ***** Modification d'un utilisateur ***** */
exports.modifyUser = (req, res, next) => {

   // const token = req.headers.authorization.split('')[1];
  //  const decodedToken = jwt.verify(token,process.env.SECRET_TOKEN);
   // const userId = decodedToken.userId;
  console.log( req.body.userId)

    connection.query ('select id from users where id = ? ', [userId],

    function (err,results){
        console.log(results)

        if (req.body.userId != userId){

            return res.status(404).json({ message:"utilisateur non trouvé", error:err});

        }else{
            const emailHash = Buffer.from(req.body.email).toString('hex');
            bcrypt.hash(req.body.password, 10)

            .then(hash => {

                connection.query ('update users set pseudo=?,email=?,password=? where id=?', [req.body.pseudo, emailHash, hash,userId],

                function (err,results) {

                    if (results.affectedRows == 0 ){

                        return res.status(500).json({message:"utilisateur non modifié" , error:err})

                    }else{

                        return res.status(200).json({ message:"utilisateurs modifié" , results});

                    }
                })
            })
            .catch(error => res.status(400).json({ error }));

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






 

