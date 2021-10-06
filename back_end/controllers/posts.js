// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');


/* ***** Création d'un post ***** */ 

exports.createPost = (req, res, next) => {

    connection.query ('insert into posts (title,publication,created,user_id) VALUES (?,?,now(),?)', [req.body.title, req.body.publication,req.params.user_id],

        function (err, results) {

            if (err) {

                return res.status(500).json({ message:"Post non crée" , error:err })

            }else {

                return res.status(201).json({message:"Post crée" , results});
            }
        });
};


/* ***** Modification d'un post ***** */ 
exports.modifyPost = (req, res, next) => {

    connection.query ('update posts set title = ?, publication = ?  where user_id =? and id= ? ', [req.body.title, req.body.publication,req.params.user_id,req.params.id],

        function (err, results) {

            if (err || results.affectedRows==0) {

                return res.status(500).json({message:"Post non modifié" , error:err})

            }else {

                return res.status(200).json({ message:"Post modifié" , results});   
            }
        });
};


/* ***** Suppression d'un post ***** */
exports.deletePost = (req, res, next) => {

    connection.query('delete from posts where (user_id = ? and id = ?) ',[req.params.user_id, req.params.id],

        function (err, results) {

            if (err || results.affectedRows==0) {

                return res.status(500).json({message:"Post non supprimé" , error:err})

            }else{

                return res.status(200).json({message:"Post supprimer" , results})

            }
        });
};


/* ***** Recherche de tout les posts ***** */ 
exports.getAllPosts = (req, res, next) => {

    connection.query('select * from posts',
 
        function (err, results) {   

            if (results.length === 0) {

                return res.status(404).json({message:"Aucun posts" , error:err})

            }else {

                return res.status(200).json({message:"les différents post ont été trouvé " , results})

            }
        });
};


/* ***** Recherche d'un post ***** */
exports.getOnePost = (req, res, next) => {

    connection.query('select * from posts where (user_id =? and id = ? )', [req.params.user_id,req.params.id],

        function (err, results) {

            if (results.length === 0) {
            
                return res.status(404).json({message:"Post non trouvé" , error:err}) 

            }else{

                return res.status(200).json({message:"Post trouvé" , results})

            }
        });
};


exports.likePost = (req, res, next) => {

    connection.query ('select * from likes where (user_id = ? and post_id =? )' , [req.params.user_id,req.params.post_id],
    
        function (err, results) {

            if (results.length === 0) {
           
                connection.query('insert into likes (user_id,post_id,likes,dislikes) values (?,?,?,?)',[req.params.user_id, req.params.post_id,  true, false],

                    function (err, results) {

                        return res.status(200).json({message :"Commentaire validé "});

                    }else{

                        function (err,results){

                            connection.query('update likes set user_id = ? , post_id = ? , likes = ? , dislike = ? where user_id =? and post_id= ? ', [req.params.user_id , req.params.post_id , false, false],

                                return res.status(200).json({message:"Like enlevé du post", results});
                        
                            )
                        }
                    }
                )
            } 
        }      
    )
}
        