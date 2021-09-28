const connection = require('../middleware/connect.bdd');
const fs = require('fs');
const { post } = require('../routes/posts');


// Création d'un post 

exports.createPost = (req, res, next) => {

    let filename = "";
    if (req.file) {
        filename = req.file.filename;
    }

    connection.query ('insert into posts (title,publication,created,user_id,image) VALUES (?,?,now(),?,?)', [req.body.title, req.body.publication,req.body.user_id,filename],
        function (err, results) {
            if (err) {
                res.status(500).json({ error: "Post non crée" })
            }
            res.status(201).end("Post bien crée");
        })
};


// Modification d'un post 

exports.modifyPost = (req, res, next) => {

    connection.query ( 'select * from posts where id = ?', [req.params.id],
     function (err,results) {
        if (results.length === 0) {         
            res.status(500).json({message:"erreur 500"}) 
        } 
        
        const post = results[0]
        if (post.image && fs.existsSync('images/' + post.image)){
            fs.unlinkSync('images/' + post.image)
        }
        let filename = '';
            if (req.file) {
                filename = req.file.filename;
            }

        connection.query ('update posts set title = ?, publication = ?, image = ? where id = ?', [req.body.title, req.body.publication, filename, req.params.id],
        function (err, results) {
            if (err) {
                res.status(500).json({ error:"Erreur lors de la modification",err})
            }
            res.status(200).json({ status: 'Modification effectué'});
        })
    })
};

exports.deletePost = (req, res, next) => {

    connection.query( 'select * from posts where id = ?',[req.params.id],
        function(err, results){
            if (err) {
                res.status(500).json(err)
            }

            const post = results[0]
            if (post.image) {
                fs.unlinkSync('images/' + post.image)
            }

            connection.query('delete from posts where id = ?',[req.params.id],
            function (err, results) {
                if (err) {
                    res.status(500).json(err)
                }
                res.status(204).end()
            })
        })
    }


exports.getOnePost = (req, res, next) => {

    connection.query('select * from posts where id = ?', [req.params.id],

    function (err, results) {
        if (results.length === 0) {
            
            res.status(404).json({message:"erreur 404"}) 

        } 
        res.status(200).end("Post trouvé")
        console.log(results)
    });

};




