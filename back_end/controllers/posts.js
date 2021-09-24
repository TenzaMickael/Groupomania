

const connection = require('../middleware/connect.bdd');



exports.createPost = (req, res, next) => {

    connection.query ('INSERT into posts (title,publication,created,user_id) VALUES (?,?,now(),?)', [req.body.title, req.body.publication,req.body.user_id],
        function (err, results) {
            if (err) {
                res.status(500).json({ error:err })
            }
            res.status(201).end();
        })
};


exports.getOnePost = (req, res, next) => {

    connection.query('select*from posts where id= ?', [req.params.id],
    function (err, results) {
        if (err) {
            res.status(401).json({ error:err })
        }
        res.status(200).end();
    })

};

