// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');


/* ***** Création d'un commentaire ***** */ 
exports.createComment = (req, res, next) => {

    connection.query ('insert into comments (user_id,content,post_id) VALUES (?,?,?)', [req.params.user_id, req.body.content,req.params.post_id],

        function (err, results) {
            if (err) {
                res.status(500).json({ message:"Commentaire non crée" , error:err })
            }
            res.status(201).json({message:"Commentaire crée" , results});
        });
};

/* ***** Modification d'un commentaire ***** */ 
exports.modifyComment = (req, res, next) => {

    connection.query ('update comments set content = ?  where user_id = ? and id= ? ', [req.body.content,req.params.user_id,req.params.id,],


function (err, results) {
    if (err || results.affectedRows==0) {
        res.status(500).json({message:"Commentaire non modifié" , error:err})
    }
    res.status(200).json({ message:"Commentaire modifié" , results});   
})
};


/* ***** Suppression d'un commentaire  ***** */

exports.deleteComment = (req, res, next) => {

            connection.query('delete from comments where (user_id = ? and id = ?)',[req.params.user_id, req.params.id],
            function (err, results) {
                if (err || results.affectedRows==0) {
                    res.status(500).json({message:"Commentaire non supprimé" , error:err})
                }
                res.status(200).json({message:"Commentaire supprimer" , results})
            })
    }


/* ***** Recherche de tout les commentaires ***** */ 

exports.getAllComments = (req, res, next) => {

    connection.query('select * from comments order by id = ?', [req.params.id],
   
    function (err, results) {

        if (results.length ===0) {

            res.status(404).json({message:"Aucun commentaire" , error:err})
        }
        res.status(200).json({message:"les différents commentaires ont été trouvé " , results})
        console.log(results)
    });
}

   


/* ***** Recherche d'un commentaire ***** */

exports.getOneComment = (req, res, next) => {

    connection.query('select * from comments where (user_id = ? and id = ?)', [req.params.user_id,req.params.id],

    function (err, results) {
        if (results.length === 0) {
            
            res.status(404).json({message:"Commentaire non trouvé"}) 

        } 
        res.status(200).json({message:"Commentaire trouvé"})
    });

};

