// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');


/* ***** Création d'un commentaire ***** */ 
exports.createComment = (req, res, next) => {

    const userId = req.body.userId;
    const postId = req.body.postId;
    
    connection.query ('insert into comments (user_id,content,post_id) VALUES (?,?,?)', [userId, req.body.content,postId],

        function (err, results) {

            if (err) {

                return res.status(500).json({ message:"Commentaire non crée" , error:err })

            }else{

                return res.status(201).json({message:"Commentaire crée" , results});
            }
        });
};



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

    connection.query('select * from comments where id = ?  ', [req.params.id],

        function (err, results) {

            if (results.length === 0) {
            
                return res.status(404).json({message:"Commentaire non trouvé", error:err}) 

            }else{

                return res.status(200).json({message:"Commentaire trouvé", results})

            }
        });
};


/* ***** Modification d'un commentaire ***** */ 
exports.modifyComment = (req, res, next) => {

    const userId = req.body.userId;


    connection.query ('update comments set content = ?  where user_id = ? and id = ? ', [req.body.content,userId,req.body.id],

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

    const userId = req.body.userId;

    connection.query('delete from comments where (user_id = ? and id = ?)',[userId, req.body.id],

        function (err, results) {

            if (results.affectedRows == 0) {

                return res.status(500).json({message:"Commentaire non supprimé" , error:err})
 
            }else{

                return res.status(200).json({message:"Commentaire supprimer" , results})

            }
        })
}




/* ***** Like d'un post ***** */
exports.likeComment = (req, res, next) => {

    const commentId = req.body.commentId
    const userId = req.body.userId

    connection.query ('select * from likes where (user_id = ? and comment_id =? )' , [userId,commentId],
    
        function (err, results) {

            if (results.length === 0) {
           
                connection.query('insert into likes (user_id,comment_id,likes,dislikes) values (?,?,?,?)',[userId, commentId,  true, false],

                    function (err, results) {
                        console.log(results)
                        return res.status(200).json({message :" Commentaire liké " , results});
                    
                    })
                
            }else{   

                connection.query('update likes set user_id = ? , comment_id = ? , likes = ? , dislike = ? where user_id = ? and comment_id = ? ', [userId , commentId , true, false , userId, commentId ],
                            
                    function (err,results){
                        console.log(results)
                        return res.status(200).json({message:"Commentaire déja liker", results});
                        
                        
                    })                 
            }
        }
)}


/* ***** Dislike d'un post ***** */
exports.dislikeComment = (req, res, next) => {

    const commentId = req.body.commentId
    const userId = req.body.userId

    connection.query ('select * from likes where (user_id = ? and comment_id =? )' , [userId,commentId],
    
        function (err, results) {

            if (results.length === 0) {
           
                connection.query('insert into likes (user_id,comment_id,likes,dislikes) values (?,?,?,?)',[userId, commentId, false, true],

                    function (err, results) {

                        return res.status(200).json({message :"Commentaire disliké "});
                    
                    })
                
            }else{   

                connection.query('update likes set user_id = ? , comment_id = ? , likes = ? , dislike = ? where user_id = ? and comment_id = ? ', [userId , commentId , false, true ,userId,commentId ],
                            
                    function (err,results){
                    
                        return res.status(200).json({message:"Commentaire déja disliké", results});
                        
                     })                 
            }
        }
)};


/* ***** Reset du like dislikes ***** */
exports.resetLikes = (req, res, next) => {

    const commentId = req.body.commentId
    const userId = req.body.userId

    connection.query ('delete from likes where (user_id = ? and comment_id = ?)' , [userId,commentId],

        function (err, results) {
      
            if (results.affectedRows == 0) {
          
                return res.status(500).json({message:"Avis non supprimé " , error:err})

            }else{
          
                return res.status(200).json({message:"Avis réinitialisé" , results})

            }
    }
)};

