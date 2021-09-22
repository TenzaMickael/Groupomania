const connection = require('../middleware/connect.bdd');

exports.createUser = (req, res, next) => {
    

    connection.query('INSERT into `users`(pseudo,profil_picture,email,password,admin,create_at) VALUES (?,?,?,?,now())', [req.body.pseudo, req.body.profil_picture,req.body.email,req.body.password],
        function (err, results) {
            if (err) {
                res.status(500).json({ error:err })
            }
            res.status(201).end();
        })
};