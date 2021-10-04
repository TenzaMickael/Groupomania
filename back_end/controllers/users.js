// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');


/* ***** Création d'un utilisateur ***** */ 
exports.createUser = (req, res, next) => {   

    connection.query('INSERT into users (pseudo,email,password,create_at) VALUES (?,?,?,now())', [req.body.pseudo, req.body.email,req.body.password],
        function (err, results) {
            if (err) {
                res.status(500).json({message:"Utilisateur non crée" , results} )
            }
            res.status(201).json({message:"Utilisateur crée" , results });
        })
};


/* ***** Modification d'un utilisateur ***** */
exports.modifyUser = (req, res, next) => {

    connection.query ('update users set pseudo=?,email=?,password=? where id=?', [req.body.pseudo, req.body.email, req.body.password,req.params.id],
    function (err,results) {
        if (err || results.affectedRows==0){
            res.status(500).json({message:"utilisateur non modifié" , error:err})
        }
        res.status(200).json({ message:"utilisateurs modifié" , results});
       
    })
}



/* ***** Suppression d'un utilisateur ***** */
exports.deleteUser = (req, res, next) => {

    connection.query('delete from users where id = ?',[req.params.id],
    function (err, results) {
        if (err || results.affectedRows==0) {
            res.status(500).json({message:"Utilisateur non supprimé" , error:err})
        }
        res.status(200).json({message:"Utilisateur supprimer" , results})
    })
}


/* ***** Recherche de tout les utilisateurs ***** */ 
exports.getAllUsers = (req, res, next) => {

connection.query('select * from users order by users.id = ?', [req.params.id],

function (err, results) {

if (results.length ===0) {

    res.status(404).json({message:"Aucun utilisateurs" , error:err})
}
res.status(200).json({message:"Utilisateurs trouvé " , results})

});


}

/* ***** Recherche d'un utilisateur ***** */
exports.getOneUser = (req, res, next) => {

connection.query('select * from users where id = ?', [req.params.id],

function (err, results) {
if (results.length === 0) {
    
    res.status(404).json({message:"Utilisateur non trouvé"}) 

} 
res.status(200).json({message:"Utilisateur trouvé"})
});

};

/*exports.likePost = (req, res, next) => {

connection.query ('SELECT * FROM posts JOIN likes ON posts.user_id = likes.post_id where likes.likes = true ' , [req.params.id],
function (err, results) {
if (results.length === 0) {
    res.status(404).json({message :"pas de likes"})
    ('insert into likes.post_id (likes) value likes=true')
}
res.status(200).json({message:"likes"})


})

}


*/

 
