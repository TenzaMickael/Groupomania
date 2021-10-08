// On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');
const connection = require('../middleware/connect.bdd');

require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify (token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId

        connection.query(
            'SELECT * FROM users WHERE id = ?', [userId],
            function(err, results) {

                if (req.body.userId && req.body.userId !== userId) {
                    throw 'User ID non valable !'
                } else {
                    next()
                }
            }) 
        
        
        }catch (error) {
        res.status(401).json({
            error: 'Requête non authentifiée !'
        })
    }
}



