
/* ***** CONTROLLEUR POSTS.JS ***** */


// On importe le middleware "connect.bdd.js" 
const connection = require('../middleware/connect.bdd');



/* ***** Création d'un post ***** */ 

exports.createPost = (req, res, next) => {
    const userId = req.body.userId

    connection.query ('insert into posts (title,publication,created,user_id) VALUES (?,?,now(),?)', [req.body.title, req.body.publication,userId],

        function (err, results) {

            if (err) {

                return res.status(500).json({ message:"Post non crée" , error:err });

            }else {

                return res.status(201).json({message:"Post crée" , results});
            }
        })
};


/* ***** Recherche de tout les posts ***** */ 

exports.getAllPosts = (req, res, next) => {


    connection.query('select * from posts ',(req.body.userId),
 
        function (err, results) {   

            if (results.length === 0) {

                return res.status(404).json({message:"Aucun posts" , error:err});

            }else {

                return res.status(200).json({message:"les différents post ont été trouvé " , results});

            }
        })
};


/* ***** Recherche d'un post ***** */

exports.getOnePost = (req, res, next) => {

    connection.query('select * from posts where id = ? ', [req.params.id],

        function (err, results) {

            if (results.length === 0) {
            
                return res.status(404).json({message:"Post non trouvé" , error:err});

            }else{

                return res.status(200).json({message:"Post trouvé" , results});

            }
        })
};


/* ***** Modification d'un post ***** */ 

exports.modifyPost = (req, res, next) => {

  const postId= req.body.postId;
  const userId = req.body.userId;
     
connection.query ('update posts set title = ?, publication = ? where id= ? and user_id = ?', [req.body.title, req.body.publication,postId,userId],

    function (err,results) {
                   
        if (results.affectedRows == 0){

            return res.status(500).json({message:"post non modifié" , error:err});

        }else{

            return res.status(200).json({ message:"post modifié" , results});

        }
    })          
};
    

/* ***** Suppression d'un post ***** */

exports.deletePost = (req, res, next) => {
    const postId = req.body.postId;
    const userId = req.body.userId;

    connection.query('delete from posts where id = ? and user_id = ?',[postId,userId],

        function (err, results) {

            if (results.affectedRows == 0) {

                return res.status(500).json({message:"Post non supprimé" , error:err});

            }else {

                return res.status(200).json({message:"Post supprimer" , results})
            }
        })
};


/* ***** Like d'un post ***** */

exports.likePost = (req, res, next) => {

    const postId = req.body.postId
    const userId = req.body.userId


    connection.query ('select * from likes where (user_id = ? and post_id =? )' , [userId,postId],
    
        function (err, results) {

            if (results.length === 0) {

       
                connection.query('insert into likes (user_id,post_id,likes,dislikes) values (?,?,?,?)',[userId, postId,  true, false],

                    function (err, results) {
                       
                    
                        return res.status(200).json({message :" Post liké " , results});
                    
                    })
                
            }else{   

                connection.query('update likes set user_id = ? , post_id = ? , likes = ? , dislike = ? where user_id = ? and post_id = ? ', [userId , postId , true, false ,userId,postId ],
                            
                    function (err,results){
                       
                        return res.status(200).json({message:"Post déja liker", results});
                        
                        
                    })                 
            }
        }
)};


/* ***** Dislike d'un post ***** */

exports.dislikePost = (req, res, next) => {

    const postId = req.body.postId
    const userId = req.body.userId


    connection.query ('select * from likes where (user_id = ? and post_id =? )' , [userId,postId],
    
        function (err, results) {

            if (results.length === 0) {
           
                connection.query('insert into likes (user_id,post_id,likes,dislikes) values (?,?,?,?)',[userId, postId, false, true],

                    function (err, results) {

                        return res.status(200).json({message :"Avis validé ", results});
                    
                    })
                
            }else{   

                connection.query('update likes set user_id = ? , post_id = ? , likes = ? , dislike = ? where user_id = ? and post_id = ? ', [userId, postId , false, true ,userId,postId ],
                            
                    function (err,results){
                    
                        return res.status(200).json({message:"post déja disliker", results});
                        
                    })                 
            }
        }
)};


/* ***** Reset du like dislikes ***** */

exports.resetLikes = (req, res, next) => {

    const postId = req.body.postId
    const userId = req.body.userId

    connection.query ('delete from likes where (user_id = ? and post_id = ?)' , [userId,postId],

        function (err, results) {
      
            if (results.affectedRows == 0) {
          
                return res.status(500).json({message:"Avis non supprimé " , error:err});

            }else{
          
                return res.status(200).json({message:"Avis réinitialisé" , results});

            }
    }
)};

   
            