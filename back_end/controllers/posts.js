// On importe les identifiants de la bdd mysql 
const connection = require('../middleware/connect.bdd');



/* ***** Création d'un post ***** */ 
exports.createPost = (req, res, next) => {

    connection.query ('insert into posts (title,publication,created,user_id) VALUES (?,?,now(),?)', [req.body.title, req.body.publication,req.body.user_id],
        function (err, results) {
            if (err) {
                res.status(500).json({ message:"Post non crée" , error:err })
            }
            res.status(201).json({message:"Post crée" , results});
        });
};


/* ***** Modification d'un post ***** */ 
exports.modifyPost = (req, res, next) => {

            connection.query ('update posts set title = ?, publication = ?  where id = ? and user_id = ?', [req.body.title, req.body.publication,req.params.id,req.body.user_id],
        function (err, results) {
         console.log(results)
            if (err) {
                res.status(500).json({message:"Post non modifié" , error:err})
                console.log(req.params.id)
            }
            res.status(200).json({ message:"Post modifié"});
            console.log(req.params.id)
           
        })
};


/* ***** Suppression d'un post ***** */
exports.deletePost = (req, res, next) => {


            connection.query('delete from posts where id = ?',[req.params.id],
            function (err, results) {
                if (err) {
                    res.status(500).json({message:"Post non supprimé" , error:err})
                }
                res.status(204).json({message:"Post supprimer" , results})
            })
    }


/* ***** Recherche de tout les posts ***** */ 
exports.getAllPosts = (req, res, next) => {

    connection.query('select * from posts order by posts.user_id = ?', [req.params.id],
   
    function (err, results) {

        if (results.length ===0) {

            res.status(404).json({message:"Utilisateurs sans posts" , error:err})
        }
        res.status(200).json({message:"les différents post ont été trouvé " , results})
        console.log(results)
    });


}

/* ***** Recherche d'un post ***** */
exports.getOnePost = (req, res, next) => {

    connection.query('select * from posts where id = ?', [req.params.id],

    function (err, results) {
        if (results.length === 0) {
            
            res.status(404).json({message:"Post non trouvé"}) 

        } 
        res.status(200).json({message:"Post trouvé"})
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

