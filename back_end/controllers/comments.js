// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');


/* ***** Création d'un commentaire ***** */ 
exports.createComment = (req, res, next) => {
    
    connection.query ('insert into comments (user_id,content,post_id) VALUES (?,?,?)', [req.params.user_id, req.body.content,req.params.post_id],

        function (err, results) {

            if (err) {

                return res.status(500).json({ message:"Commentaire non crée" , error:err })

            }else{

                return res.status(201).json({message:"Commentaire crée" , results});
            }
        });
};


/* ***** Modification d'un commentaire ***** */ 
exports.modifyComment = (req, res, next) => {

    connection.query ('update comments set content = ?  where user_id = ? and id = ? ', [req.body.content,req.params.user_id,req.params.id,],

        function (err, results) {

            if (results.affectedRows == 0 ) {
console.log(results)
                return res.status(500).json({message:"Commentaire non modifié" , error:err})

            }else{
                console.log(results)
                return res.status(200).json({ message:"Commentaire modifié" , results}); 
            }  
        })
};


/* ***** Suppression d'un commentaire  ***** */

exports.deleteComment = (req, res, next) => {

    connection.query('delete from comments where (user_id = ? and id = ?)',[req.params.user_id, req.params.id],

        function (err, results) {

            if (results.affectedRows==0 ||! results.insertId == req.params.user_id ) {

                return res.status(500).json({message:"Commentaire non supprimé" , error:err})
 
            }else{

                return res.status(200).json({message:"Commentaire supprimer" , results})

            }
        })
}


/* ***** Recherche de tout les commentaires ***** */ 

exports.getAllComments = (req, res, next) => {

    connection.query('select * from comments',
   
        function (err, results) {

            if (results.length ===0) {

                return res.status(404).json({message:"Aucun commentaire" , error:err})

            }else{

                return res.status(200).json({message:"les différents commentaires ont été trouvé " , results})

            }
        });
}


/* ***** Recherche d'un commentaire ***** */

exports.getOneComment = (req, res, next) => {

    connection.query('select * from comments where (user_id = ? and id = ?)', [req.params.user_id,req.params.id],

        function (err, results) {

            if (results.length === 0) {
            
                return res.status(404).json({message:"Commentaire non trouvé"}) 

            }else{

                return res.status(200).json({message:"Commentaire trouvé"})

            }
        });
};


/* ***** Like d'un post ***** */
exports.likeComment = (req, res, next) => {

    connection.query ('select * from likes where (user_id = ? and comment_id =? )' , [req.params.user_id,req.params.comment_id],
    
        function (err, results) {

            if (results.length === 0) {
           
                connection.query('insert into likes (user_id,comment_id,likes,dislikes) values (?,?,?,?)',[req.params.user_id, req.params.comment_id,  true, false],

                    function (err, results) {
                        console.log(results)
                        return res.status(200).json({message :"Avis validé " , results});
                    
                    })
                
            }else{   

                connection.query('update likes set user_id = ? , comment_id = ? , likes = ? , dislike = ? where user_id = ? and comment_id = ? ', [req.params.user_id , req.params.post_id , true, false ,req.params.user_id,req.params.post_id ],
                            
                    function (err,results){
                        console.log(results)
                        return res.status(200).json({message:"Mauvais id du commentaire", results});
                        
                        
                    })                 
            }
        }
)}


/* ***** Dislike d'un post ***** */
exports.dislikeComment = (req, res, next) => {

    connection.query ('select * from likes where (user_id = ? and comment_id =? )' , [req.params.user_id,req.params.comment_id],
    
        function (err, results) {

            if (results.length === 0) {
           
                connection.query('insert into likes (user_id,comment_id,likes,dislikes) values (?,?,?,?)',[req.params.user_id, req.params.comment_id, false, true],

                    function (err, results) {

                        return res.status(200).json({message :"Avis validé "});
                    
                    })
                
            }else{   

                connection.query('update likes set user_id = ? , comment_id = ? , likes = ? , dislike = ? where user_id = ? and comment_id = ? ', [req.params.user_id , req.params.comment_id , false, true ,req.params.user_id,req.params.comment_id ],
                            
                    function (err,results){
                    
                        return res.status(200).json({message:"Like mis à jour", results});
                        
                     })                 
            }
        }
)};


/* ***** Reset du like dislikes ***** */
exports.resetLikes = (req, res, next) => {

    connection.query ('delete from likes where (user_id = ? and comment_id = ?)' , [req.params.user_id,req.params.comment_id],

        function (err, results) {
      
            if (results.affectedRows == 0) {
          
                return res.status(500).json({message:"Avis non supprimé " , error:err})

            }else{
          
                return res.status(200).json({message:"Avis réinitialisé" , results})

            }
    }
)};

